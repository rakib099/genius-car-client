
export const setAuthToken = (user, navigate, from) => {
    const currentUser = {
        email: user.email
    }

    // getting a jwt token from the server side
    fetch('https://genius-car-server-liard-xi.vercel.app/jwt', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            localStorage.setItem('genius-token', data.token);

            if (document.location.toString() === 'https://genius-car-1bb37.web.app/signup') {
                // Stay on this page. Don't navigate.
            }
            else {
                navigate(from, { replace: true });
            }
        })
        .catch(err => console.error(err));
}