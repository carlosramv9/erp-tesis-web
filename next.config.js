const { i18n } = require("./next-i18next.config");
const path = require("path");
module.exports = {
    swcMinify: true,
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, "scss")],
    },
    env: {
        development: "http://localhost:8010",
        production: "https://server.vivefeliz.mx",
        ACCESS_TOKEN: "accessToken",
        routes: [{
                name: "Usuarios",
                route: "users",
            },
            {
                name: "Roles",
                route: "roles",
            },
            {
                name: "Clientes",
                route: "customers",
            },
            {
                name: "Desarrollos",
                route: "pDevelopment",
            },
            {
                name: "Procesos",
                route: "process",
            },
            {
                name: "Plantillas de Proceso",
                route: "processTemplates",
            },
            {
                name: "Constructoras",
                route: "builders",
            },
            {
                name: "Categorias",
                route: "categories",
            },
            {
                name: "Eventos",
                route: "events",
            },
            {
                name: "Documentos de Usuario",
                route: "userAttachments",
            },
            {
                name: "Blogs",
                route: "articles",
            },
            {
                name: "Bancos",
                route: "banks",
            },
        ],
    },
    images: {
        domains: [
            "http:/localhost:8010",
            "localhost",
            "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css",
        ],
    },
    urlImports: [
        "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css",
    ],
};