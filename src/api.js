import http from "vue-resource"

export function post(url) {
    return http.get(url, { headers: { Authorization: localStorage.getItem("auth_key") } })
}