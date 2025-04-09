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
    const blog = "def53e95f1fc7a2aa7dbc4685f282f1e3e4ea3b364b07622e58edb15d239b252";
    const welcome = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8";

    if (hashHex === blog) {
        window.location.href = '/blog';
    } 
    else if (hashHex === welcome) {
        window.location.href = '/welcome';
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
