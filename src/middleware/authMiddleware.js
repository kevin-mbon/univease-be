const protectRoute = (req, res, next) => {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
        // User is authenticated, allow access to the route
        next();
    } else {
        // User is not authenticated, redirect to login page or send an error response
        res.status(401).json({ error: 'Unauthorized' });
    }
};

export default protectRoute;
