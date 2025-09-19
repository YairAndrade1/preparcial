const API_URL = "http://127.0.0.1:8080";

export async function apiGetAuthors() {
    const res = await fetch(`${API_URL}/api/authors`);
    if (!res.ok) throw new Error("Error loading authors")
    return res.json();
}

export async function apiCreateAuthor(data: {
    name:string; description:string; image:string; birthDate:string
}){
    const res = await fetch(`${API_URL}/api/authors`, {
        method: "POST",
        headers: { "Content-Type":"application/json"},
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error creating new author")
    return res.json();
}

export async function apiUpdateAuthor(id:number, data: {
     name:string; description:string; image:string; birthDate:string
}) {
    const res = await fetch(`${API_URL}/api/authors/${id}`, {
        method: "PUT",
        headers: { "Content-Type":"application/json"},
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error updating author")
    return res.json();
}

export async function apiDeleteAuthor(id:number){
    const res = await fetch(`${API_URL}/api/authors/${id}`, {method: "DELETE"});
    if(!res.ok) throw new Error("Error deleting author")
    return true;
}