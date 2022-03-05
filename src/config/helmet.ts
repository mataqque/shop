export const policy = {
    contentSecurityPolicy: {
        directives: {
        defaultSrc: ["'self'"], 
        scriptSrc: ["'self'", 'ourAuth0domain.us.auth0.com'],
        styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
        imgSrc: ["'self'", 'https://ourAuth0domain.us.auth0.com', 'data:'],
        connectSrc: ["'self'", 'https://ourAuth0domain.us.auth0.com/oauth/token'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        objectSrc: ["'self'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'self'"]
        },
        reportOnly: true
    }
}