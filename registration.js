(() => {
  const form = document.querySelector('#lead-form');
  if (!form) return;
  const status = document.querySelector('#form-status');
  const button = form.querySelector('[type="submit"]');
  const endpoint = window.LEWEST_REGISTRATION_ENDPOINT;
  if (!endpoint) return;
  form.querySelector('.form-help').textContent = '필수 항목을 입력하고 개인정보 수집·이용에 동의해 주세요.';
  let pending = false;
  let attempt;
  const uuid = () => crypto.randomUUID ? crypto.randomUUID() : '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c => (Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4).toString(16));
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (pending) return;
    status.textContent = '';
    const fields = form.elements;
    const name = fields.name.value.trim();
    const phone = fields.phone.value.replace(/[^0-9]/g, '');
    if (name.length < 2 || name.length > 30 || /[<>=]/.test(name)) {
      status.textContent = '성함을 2~30자로 입력해 주세요.'; fields.name.focus(); return;
    }
    if (!/^0[0-9]{8,10}$/.test(phone)) {
      status.textContent = '연락처를 확인해 주세요.'; fields.phone.focus(); return;
    }
    if (!fields.privacy_agree.checked) {
      status.textContent = '개인정보 수집·이용 동의가 필요합니다.'; fields.privacy_agree.focus(); return;
    }
    if (!form.reportValidity()) return;
    const data = {name, phone, interest_type: fields.interest_type.value, visit_date: fields.visit_date.value, privacy_agree: true, website: fields.website.value};
    const fingerprint = JSON.stringify(data);
    if (!attempt || attempt.fingerprint !== fingerprint) attempt = {fingerprint, id: uuid()};
    pending = true; button.disabled = true; form.setAttribute('aria-busy', 'true');
    status.textContent = '접수 중입니다. 잠시만 기다려 주세요.';
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(endpoint, {method: 'POST', headers: {'Content-Type': 'text/plain;charset=utf-8'}, body: JSON.stringify({...data, request_id: attempt.id}), credentials: 'omit', redirect: 'follow', signal: controller.signal});
      if (!response.ok) throw new Error('NETWORK');
      const result = await response.json();
      if (result.ok !== true) {
        status.textContent = typeof result.message === 'string' ? result.message : '접수하지 못했습니다. 잠시 후 다시 신청해 주세요.';
        return;
      }
      if (result.request_id !== attempt.id) throw new Error('INVALID_RESPONSE');
      form.reset(); attempt = null;
      status.textContent = '관심고객등록이 완료되었습니다.';
    } catch (error) {
      status.textContent = '접수 결과를 확인하지 못했습니다. 다시 누르면 중복 없이 확인합니다. 계속 문제가 있으면 1877-2027로 문의해 주세요.';
    } finally {
      clearTimeout(timer); pending = false; button.disabled = false; form.removeAttribute('aria-busy');
    }
  });
})();
