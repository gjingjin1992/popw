switch (localStorage.getItem('version')) {
  case 'a':
    // do nothing
    break;
  case 'b':
    window.location = 'https://next.popwristbands.com';
    break;
  default:
    var script = document.createElement('script');
    script.src = 'https://cdn.firebase.com/js/client/2.4.2/firebase.js';
    script.onload = function () {
      var ref = new Firebase('https://popwb-athena.firebaseio.com');
      var settings = ref.child('settings/legacy_split');
      settings.on('value', function (snapshot) {
        if (Math.random() < snapshot.val()) {
          localStorage.setItem('version', 'b');
          window.location = 'https://next.popwristbands.com';
        } else {
          localStorage.setItem('version', 'a');
        }
      });
    };

    document.head.appendChild(script);
    break;
}
