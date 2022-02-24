const jwt = require('jsonwebtoken')
const url = require('url')
const { handleNotFound, getTasks, addTask, updateTaskById, deleteTask, signUp, signIn, pingWithAuth, getTaskById, getImage,
    getUsers,
    addUser,
    getUserByUsername,
    updateUserByUsername,
    deleteUserByUsername,
    getMe
} = require('./controllers')
const { authenticate, adminAuthenticate } = require('./middlewares')
const { handleError, convert2RoutePathname} = require('./helpers')
const parseRequestBody = require("./middlewares/parse-request-body");
const {addProject, getProjects, getProjectByById, updateProjectById, deleteProjectById} = require("./controllers/project.controller");
const { resolve } = require('path')
const { rejects } = require('assert')

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
        middlewares: [authenticate]
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
        middlewares: [authenticate]
    },
    {
        pathname: '/tasks/{id}/update',
        method: 'PATCH',
        controller: updateTaskById,
        middlewares: [authenticate, parseRequestBody]
    },
    {
        pathname: '/tasks/{id}/delete',
        method: 'DELETE',
        controller: deleteTask,
        middlewares: [authenticate, parseRequestBody]
    },
    {
        pathname: '/users',
        method: "GET",
        controller: getUsers,
        middlewares: [ adminAuthenticate, parseRequestBody]
    },
    {
        pathname: '/users',
        method: "POST",
        controller: addUser,
        middlewares: [adminAuthenticate, parseRequestBody]
    },
    {
        pathname: '/users/me',
        method: "POST",
        controller: getMe,
        middlewares: [parseRequestBody]
    },
    {
        pathname: '/users/{username}',
        method: "GET",
        controller: getUserByUsername,
        middlewares: [adminAuthenticate]
    },
    {
        pathname: '/users/{username}/update',
        method: "PATCH",
        controller: updateUserByUsername,
        middlewares: [adminAuthenticate, parseRequestBody]
    },
    {
        pathname: '/users/{username}/delete',
        method: "DELETE",
        controller: deleteUserByUsername,
        middlewares: [adminAuthenticate]
    },
    {
        pathname: '/projects',
        method: "GET",
        controller: getProjects,
        middlewares: [authenticate]
    },
    {
        pathname: '/projects',
        method: "POST",
        controller: addProject,
        middlewares: [adminAuthenticate ,parseRequestBody]
    },
    {
        pathname: '/projects/{id}',
        method: "GET",
        controller: getProjectByById,
        middlewares: [authenticate]
    },
    {
        pathname: '/projects/{id}/update',
        method: "PATCH",
        controller: updateProjectById,
        middlewares: [adminAuthenticate,parseRequestBody]
    },
    {
        pathname: '/projects/{id}/delete',
        method: "DELETE",
        controller: deleteProjectById,
        middlewares: [adminAuthenticate]
    }
]

function route(req) {
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
                        promise = promise.then(() => {
                            if (!res.finished) {
                                middleware(req)
                            }
                        }, () => {
                            if(!res.finished){
                                res.statusCode = 401;
                                res.end();
                            }
                        })
                    }
                })
                promise.then(() => {
                    if(!res.finished){
                        route.controller(req, res)
                    }
                }, () => {
                    if(!res.finished){
                        res.statusCode = 401;
                        res.end();
                    }
                });
                
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