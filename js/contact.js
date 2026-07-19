/* =====================================================================
   RAY'S SMOKESHACK — CONTACT.JS
   Builds an SMS (to 470-313-4593) or email draft from the catering
   form fields — no backend required. Opens the device's native
   messaging or mail app with the message pre-filled.
   ===================================================================== */
(function () {
  'use strict';

  var RAY_PHONE = '4703134593';
  var RAY_EMAIL = 'info@rayssmokeshack.com';

  var form = document.getElementById('contact-form');
  var textBtn = document.getElementById('prepare-text-btn');
  var emailBtn = document.getElementById('prepare-email-btn');
  var statusEl = document.getElementById('contact-form-status');

  if (!form) return;

  function getFieldValues() {
    return {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      email: form.email.value.trim(),
      date: form.date.value,
      guests: form.guests.value.trim(),
      eventType: form.eventType.value,
      location: form.location.value.trim(),
      message: form.message.value.trim()
    };
  }

  function validateRequired(fields) {
    if (!fields.name || !fields.phone) {
      statusEl.textContent = 'Please fill in your name and phone number before sending.';
      return false;
    }
    return true;
  }

  function buildMessageBody(fields) {
    var lines = [];
    lines.push("Hi Ray! My name is " + fields.name + ".");
    lines.push("I'm interested in catering.");
    lines.push('');
    lines.push('Date: ' + (fields.date || 'TBD'));
    lines.push('Guests: ' + (fields.guests || 'TBD'));
    lines.push('Event Type: ' + (fields.eventType || 'TBD'));
    lines.push('Location: ' + (fields.location || 'TBD'));
    if (fields.phone) lines.push('Phone: ' + fields.phone);
    if (fields.email) lines.push('Email: ' + fields.email);
    if (fields.message) {
      lines.push('');
      lines.push('Message: ' + fields.message);
    }
    return lines.join('\n');
  }

  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  if (textBtn) {
    textBtn.addEventListener('click', function () {
      var fields = getFieldValues();
      if (!validateRequired(fields)) return;

      var body = buildMessageBody(fields);
      var separator = isIOS() ? '&' : '?';
      var smsUrl = 'sms:' + RAY_PHONE + separator + 'body=' + encodeURIComponent(body);

      statusEl.textContent = 'Opening your messages app with your details filled in…';
      window.location.href = smsUrl;
    });
  }

  if (emailBtn) {
    emailBtn.addEventListener('click', function () {
      var fields = getFieldValues();
      if (!validateRequired(fields)) return;

      var subject = 'Catering Inquiry — ' + fields.name;
      var body = buildMessageBody(fields);
      var mailtoUrl = 'mailto:' + RAY_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

      statusEl.textContent = 'Opening your email app with your details filled in…';
      window.location.href = mailtoUrl;
    });
  }

})();
