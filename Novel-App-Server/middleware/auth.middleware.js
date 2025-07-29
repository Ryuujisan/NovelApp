import admin from 'firebase-admin';

const config = require(`../novel-app-dc899-firebase-adminsdk-fbsvc-5a153ac6d7.json`)

admin.initializeApp({
    credential: admin.credential.cert(config)
});

export const checkAuth = async (req, res, next) => {

    // Check if the Authorization header is present
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('Unauthorized: No token provided or token format is invalid.');
    }

    // Extract the ID token from the Authorization header
    const idToken = authHeader.split('Bearer ')[1];

    try {

        console.log("Server-side Decoded Firebase ID Token:", decodedToken);

        // Attach the decoded token to the request object for later use in route handlers
        req.user = decodedToken;
        next(); //

    } catch (error) {
        console.error("Error verifying Firebase ID token:", error);
        if (error.code === 'auth/id-token-expired') {
            return res.status(401).send({msg:'Unauthorized: Token expired.'});
        } else if (error.code === 'auth/argument-error' || error.code === 'auth/invalid-id-token') {
            return res.status(401).send({msg: 'Unauthorized: Invalid token.'});
        }
        return res.status(401).send({msg: 'Unauthorized: Failed to verify token.'});
    }
}