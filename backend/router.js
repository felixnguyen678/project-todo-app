const url = require('url')
const { handleNotFound, getTasks, addTask, updateTaskById, deleteTask, signUp, signIn, pingWithAuth, getTaskById, getImage,
    getUsers,
    addUser,
    getUserByUsername,
    updateUserByUsername,
    deleteUserByUsername
} = require('./controllers')
const { authenticate } = require('./middlewares')
const { handleError, convert2RoutePathname} = require('./helpers')
const parseRequestBody = require("./middlewares/parse-request-body");
const {addProject, getProjects, getProjectByById, updateProjectById, deleteProjectById} = require("./controllers/project.controller");

const routes = [
    {
        pathname: '/sign-up',
        method: 'POST',
        controller: signUp,
        middlewares: [parseRequestBody]
    },
    {
        pathname: '/sign-in',
        method: 'POST',
        controller: signIn,
        middlewares: [parseRequestBody]
    },
    {
        pathname: '/ping-with-auth',
        method: 'POST',
        controller: pingWithAuth,
        middlewares: [parseRequestBody]
    },
    {
        pathname: '/tasks',
        method: 'GET',
        controller: getTasks,
        middlewares: []
    },
    {
        pathname: '/tasks',
        method: 'POST',
        controller: addTask,
        middlewares: [parseRequestBody]
    },
    {
        pathname: '/tasks/{id}',
        method: 'GET',
        controller: getTaskById,
        middlewares: []
    },
    {
        pathname: '/tasks/{id}/update',
        method: 'PATCH',
        controller: updateTaskById,
        middlewares: [parseRequestBody]
    },
    {
        pathname: '/tasks/{id}/delete',
        method: 'DELETE',
        controller: deleteTask,
        middlewares: [parseRequestBody]
    },
    {
        pathname: '/users',
        method: "GET",
        controller: getUsers,
        middlewares: []
    },
    {
        pathname: '/users',
        method: "POST",
        controller: addUser,
        middlewares: [parseRequestBody]
    },
    {
        pathname: '/users/{username}',
        method: "GET",
        controller: getUserByUsername,
        middlewares: []
    },
    {
        pathname: '/users/{username}/update',
        method: "PATCH",
        controller: updateUserByUsername,
        middlewares: [parseRequestBody]
    },
    {
        pathname: '/users/{username}/delete',
        method: "DELETE",
        controller: deleteUserByUsername,
        middlewares: []
    },
    {
        pathname: '/projects',
        method: "GET",
        controller: getProjects,
        middlewares: []
    },
    {
        pathname: '/projects',
        method: "POST",
        controller: addProject,
        middlewares: [parseRequestBody]
    },
    {
        pathname: '/projects/{id}',
        method: "GET",
        controller: getProjectByById,
        middlewares: []
    },
    {
        pathname: '/projects/{id}/update',
        method: "PATCH",
        controller: updateProjectById,
        middlewares: [parseRequestBody]
    },
    {
        pathname: '/projects/{id}/delete',
        method: "DELETE",
        controller: deleteProjectById,
        middlewares: []
    }
]

function route(req) {
    console.log(req.headers);
    const parsedUrl = url.parse(req.url, true);
    const routePathname = convert2RoutePathname(parsedUrl.pathname);
    if(routes.filter(route => route.pathname === routePathname && route.method === req.method).length === 0){
        return handleNotFound;
    };
    const route = routes.filter(route => route.pathname === routePathname && route.method === req.method)[0];
    if(route.middlewares && route.middlewares.length > 0) {
        return function handle(req, res) {
            try {
                let promise = route.middlewares[0](req, res)
                route.middlewares.forEach((middleware, index) => {
                    if(index > 0){
                        promise.then(() => middleware(req))
                    }
                })
                promise.then(() => route.controller(req, res));
                return promise;
            } catch (error) {
                handleError(error, 'router.js', 'route() -> controller()')
                res.statusCode = 500
                res.end()
            }
        }
    } else {
        return route.controller;
    }
}

module.exports = { route }