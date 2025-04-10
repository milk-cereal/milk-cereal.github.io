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
    const home = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8";

    
    if (hashHex === home) {
        window.location.href = '/home';
    }
    else {
       // document.getElementById('applejackwalking').classList.add('hidden');
      //  document.getElementById('applejackmad.gif').classList.remove('hidden');
         alert("I don't think you belong here...");

        //setTimeout(() => {
          //  document.getElementById('applejackwalking').classList.remove('hidden');
          //  document.getElementById('applejackmad.gif').classList.add('hidden');

       // }, 2500);
        
    }
}
