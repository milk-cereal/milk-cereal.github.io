async function checkPassword(event) {
    event.preventDefault();

    const input = document.getElementById('password').value;

    // Hash input
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Compare with hashed value
    const blog = "9e034ba94bc8fc5f7e08b0f1d257d0b5c1f30cbb1544774dd61b393aa2abaccc";

    if (hashHex === blog) {
        window.location.href = '/welcome';
    } else {
        document.getElementById('applejackwalking.gif').classList.add('hidden');
        document.getElementById('applejackmad.gif').classList.remove('hidden');

        setTimeout(() => {
            alert("I don't think you belong here...");
            document.getElementById('applejackwalking.gif').classList.remove('hidden');
            document.getElementById('applejackmad.gif').classList.add('hidden');

        }, 2500);
        
    }
}
