
handleVoice = () => {
    axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token bGlzYWwyNDE2NEBmYXhhcGRmLmNvbTo2azN6MWE2cg`,
    };
    axios.post('https://api.xcall.com.ng/v3/call')
    .then(
        console.log('rez')
    )
}

handleVoice()