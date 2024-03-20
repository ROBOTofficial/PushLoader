use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};
use std::{fs, path::Path};

fn file_check(target_path: &str) -> bool {
    Path::new(target_path).is_file()
}
fn file_load(path: &str) -> String {
    fs::read_to_string(path).unwrap()
}

#[get("/")]
async fn index() -> impl Responder {
    HttpResponse::Ok().body(file_load("./site/main/index.html"))
}
#[get("/{value}")]
async fn redirect_sites(value: web::Path<String>) -> impl Responder {
    match &value.as_str() {
        &"antidebugger" => HttpResponse::Ok().body(file_load("./site/common/antidebugger.js")),
        &"favicon.ico" => match fs::read("./site/common/favicon.ico") {
            Ok(image_content) => return HttpResponse::Ok().body(image_content),
            Err(_) => return  HttpResponse::BadRequest().body("not found"),
        },
        _ => HttpResponse::Ok().body(file_load(&format!("./site/{}/index.html", value)))
    }
}
#[get("/{file_type}/{file_dir}/{file_name}")]
async fn subfiles(parms: web::Path<(String,String,String)>) -> impl Responder {
    let (file_type,file_dir,file_name) = parms.into_inner();
    let file_types = [
        "css",
        "js",
        "webp",
        "gif",
    ];
    let images = [
        "webp",
        "gif"
    ];
    if let Some(file_extension) = file_name.split(".").last() {
        if file_type == file_extension && file_types.contains(&file_extension) && file_check(&format!("./site/{}/{}",&file_dir,&file_name)) {
            if images.contains(&file_type.as_str()) {
                match fs::read(&format!("./site/{}/{}",&file_dir,&file_name)) {
                    Ok(image_content) => return HttpResponse::Ok().body(image_content),
                    Err(_) => return  HttpResponse::BadRequest().body("not found"),
                }
            } else {
                return HttpResponse::Ok().body(file_load(&format!("./site/{}/{}",&file_dir,&file_name)));   
            }
        }
    }

    HttpResponse::BadRequest().body("not found")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(index)
            .service(redirect_sites)
            .service(subfiles)
    })
    .bind(("127.0.0.1", 3080))?
    .run()
    .await
}
