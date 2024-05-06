#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use sqlx::{postgres::PgPoolOptions, PgPool};
use tauri::State;
use tokio::runtime::Runtime;

#[tauri::command]
async fn login(state: State<'_, PgPoolWrapper>, email: &str, password: &str) -> Result<(Vec<Manager>, bool), (String, bool)> {
	let manager: Vec<Manager> = sqlx::query_as!(Manager, r#"SELECT * FROM managers WHERE email = $1"#, email)
		.fetch_all(&state.pool)
		.await
		.expect("Unable to fetch users");
	if manager.len() == 0 {
		return Err((format!("Usuário ou senha inválidos"), false));
	}
	if email == manager[0].email && password == manager[0].password {
		return Ok((manager, true));
	}
	Err((format!("Usuário ou senha inválidos"), false))
}

async fn establish_connection() -> PgPool {
	dotenv::dotenv().expect("Unable to load env variables from .env file");
	let db_url: String = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
	PgPoolOptions::new()
			.max_connections(5)
			.connect(&db_url)
			.await.expect("Unable to connect to postgres")
}

struct PgPoolWrapper {
	pub pool: PgPool,
}

#[derive(Serialize, Deserialize, Debug)]
struct Manager {
    id: i32,
    username: String,
		password: String,
		email: String,
		created_at: String,
		updated_at: String,
}

#[tauri::command]
async fn create_manager(state: State<'_, PgPoolWrapper>, username: &str, password: &str, email: &str, created_at: &str, updated_at: &str) -> Result<String, String> {
	let _rows = sqlx::query_as!(Record, r#"INSERT INTO managers (username, password, email, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)"#, username, password, email, created_at, updated_at)
	.execute(&state.pool)
	.await
	.expect("Erro ao criar administrador");
Ok(format!("{} administrador criado com sucesso", username))
}
#[tauri::command]
async fn get_managers(state: State<'_, PgPoolWrapper>) -> Result<Vec<Manager>, String> {
	let rows: Vec<Manager> = sqlx::query_as!(Manager, r#"SELECT * FROM managers"#)
		.fetch_all(&state.pool)
		.await
		.expect("Erro ao buscar administradores");
	Ok(rows)
}

#[derive(Serialize, Deserialize, Debug)]
struct Building {
	id: i32,
	name: String,
	address: String,
	manager_id: Option<i32>,
	created_at: String,
	updated_at: String,
}

#[tauri::command]
async fn create_building(state: State<'_, PgPoolWrapper>, name: &str, address: &str, manager_id: i32, created_at: &str, updated_at: &str) -> Result<String, String> {
	sqlx::query_as!(Building, r#"INSERT INTO buildings (name, address, manager_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)"#, name, address, manager_id, created_at, updated_at)
		.execute(&state.pool)
		.await
		.expect("Erro ao criar prédio");

	Ok(String::from("Prédio criado com sucesso"))
}
#[tauri::command]
async fn get_buildings(state: State<'_, PgPoolWrapper>) -> Result<Vec<Building>, String> {
	let rows: Vec<Building> = sqlx::query_as!(Building, r#"SELECT * FROM buildings"#)
		.fetch_all(&state.pool)
		.await
		.expect("Erro ao criar prédio");
	Ok(rows)
}

fn main() {
	let pool: PgPool = Runtime::new().unwrap().block_on(establish_connection());
	tauri::Builder::default()
		.plugin(tauri_plugin_store::Builder::default().build())
		.manage(PgPoolWrapper{pool})
		.invoke_handler(tauri::generate_handler![login, get_managers, create_manager, create_building, get_buildings])
		.run(tauri::generate_context!())
		.expect("Erro ao executar aplicação");
}
