#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use sqlx::{postgres::PgPoolOptions, PgPool};
use tauri::State;
use tokio::runtime::Runtime;

#[tauri::command]
fn login(email: &str, password: &str) -> (String, bool) {
	if email == "marcell" && password == "marcell" {
		(
			format!("Seja bem vindo ao app, {}!", email),
			true
		)
	} else {
		(
			format!("Usuário ou senha inválidos"),
			false
		)
	}
}

async fn establish_connection() -> PgPool {
	dotenv::dotenv().expect("Unable to load env variables from .env file");
	let db_url: String = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
	PgPoolOptions::new()
			.max_connections(5)
			.connect(&db_url)
			.await.expect("Unable to connect to postgres")
}

#[derive(Serialize, Deserialize, Debug)]
struct Record {
    id: i32,
    username: String,
		password: String,
		email: String,
		created_at: String,
		updated_at: String,
}

struct PgPoolWrapper {
	pub pool: PgPool,
}

#[tauri::command]
async fn get_managers(state: State<'_, PgPoolWrapper>) -> Result<Vec<Record>, String> {
	let rows: Vec<Record> = sqlx::query_as!(Record, r#"SELECT * FROM managers"#)
		.fetch_all(&state.pool)
		.await
		.expect("Unable to fetch users");
	Ok(rows)
}

#[tauri::command]
async fn create_manager(state: State<'_, PgPoolWrapper>, username: &str, password: &str, email: &str, created_at: &str, updated_at: &str) -> Result<String, String> {
	let rows = sqlx::query_as!(Record, r#"INSERT INTO managers (username, password, email, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)"#, username, password, email, created_at, updated_at)
		.execute(&state.pool)
		.await
		.expect("Unable to insert user");

	Ok(String::from("Created"))
}

fn main() {
	let pool: PgPool = Runtime::new().unwrap().block_on(establish_connection());
	tauri::Builder::default()
		.manage(PgPoolWrapper{pool})
		.invoke_handler(tauri::generate_handler![login, get_managers, create_manager])
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}
