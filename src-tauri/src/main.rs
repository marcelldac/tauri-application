#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn login(email: &str, password: &str) -> String {
	if email == "admin" && password == "admin" {
		format!("Seja bem vindo ao app, {}! {}", email, password)
	} else {
		format!("Usuário ou senha inválidos")
	}
}

fn main() {
	tauri::Builder::default()
		.invoke_handler(tauri::generate_handler![login])
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}
