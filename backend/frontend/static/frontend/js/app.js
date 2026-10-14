(() => {
  'use strict';

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  let toastTimer;
  function showToast(message) {
    let toast = qs('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
  }

  qsa('[data-toast]').forEach((element) => {
    element.addEventListener('click', () => showToast(element.dataset.toast));
  });

  // Demo login: keeps the prototype's role selection and makes the CTA functional.
  const loginForm = qs('[data-demo-login]');
  if (loginForm) {
    const descriptions = {
      coordenador: 'Acesso geral a métricas, unidades, perfis e indicadores operacionais.',
      professor: 'Valida o Semáforo de Saúde, revisa treinos e acompanha estagiários.',
      estagiario: 'Monta o treino do beneficiário, configura descansos e envia para aprovação.',
      beneficiario: 'Executa o treino prescrito com visão simplificada e registra feedbacks.',
    };
    let target = qs('.role-choice.is-selected', loginForm)?.dataset.target || '';
    qsa('.role-choice', loginForm).forEach((choice) => {
      choice.addEventListener('click', () => {
        qsa('.role-choice', loginForm).forEach((item) => item.classList.remove('is-selected'));
        choice.classList.add('is-selected');
        target = choice.dataset.target || target;
        const role = choice.dataset.role;
        const description = qs('[data-role-description]', loginForm);
        if (description && descriptions[role]) description.textContent = descriptions[role];
      });
    });
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (target) window.location.assign(target);
    });
  }

  const signupForm = qs('[data-demo-signup]');
  if (signupForm) {
    qsa('.signup-role-card', signupForm).forEach((card) => {
      card.addEventListener('click', () => {
        qsa('.signup-role-card', signupForm).forEach((item) => item.classList.remove('is-selected'));
        card.classList.add('is-selected');
      });
    });
    signupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const terms = qs('input[type="checkbox"]', signupForm);
      if (terms && !terms.checked) {
        showToast('Aceite os termos de uso para continuar.');
        return;
      }
      const target = signupForm.dataset.successTarget;
      showToast('Cadastro de demonstração concluído.');
      if (target) window.setTimeout(() => window.location.assign(target), 450);
    });
  }

  // Workout: local timer, progress and exercise navigation.
  const workout = qs('[data-workout]');
  if (workout) {
    const timeOutput = qs('[data-workout-time]', workout);
    const toggle = qs('[data-timer-toggle]', workout);
    const reset = qs('[data-timer-reset]', workout);
    let elapsed = 0;
    let timerId = null;

    const formatTime = (seconds) => {
      const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
      const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
      const s = String(seconds % 60).padStart(2, '0');
      return `${h}:${m}:${s}`;
    };
    const renderTime = () => { if (timeOutput) timeOutput.textContent = formatTime(elapsed); };
    const startTimer = () => {
      if (timerId) return;
      timerId = window.setInterval(() => { elapsed += 1; renderTime(); }, 1000);
      toggle?.setAttribute('aria-label', 'Pausar cronômetro');
    };
    const stopTimer = () => {
      if (!timerId) return;
      window.clearInterval(timerId);
      timerId = null;
      toggle?.setAttribute('aria-label', 'Iniciar cronômetro');
    };
    toggle?.addEventListener('click', () => timerId ? stopTimer() : startTimer());
    reset?.addEventListener('click', () => { stopTimer(); elapsed = 0; renderTime(); });

    const series = qsa('[data-series-check]', workout);
    const completedOutput = qs('[data-completed-series]', workout);
    const progressFill = qs('[data-progress-fill]', workout);
    const renderProgress = () => {
      const completed = series.filter((input) => input.checked).length;
      if (completedOutput) completedOutput.textContent = completed;
      if (progressFill) progressFill.style.width = `${(completed / Math.max(series.length, 1)) * 100}%`;
    };
    series.forEach((input) => input.addEventListener('change', renderProgress));
    renderProgress();

    const tabs = qsa('[data-exercise-tab]', workout);
    const panels = qsa('[data-exercise-panel]', workout);
    let activeIndex = Number(qs('[data-exercise-tab].is-active', workout)?.dataset.exerciseTab || 1);
    const activateExercise = (index) => {
      activeIndex = index;
      tabs.forEach((tab) => tab.classList.toggle('is-active', Number(tab.dataset.exerciseTab) === index));
      panels.forEach((panel) => panel.classList.toggle('is-hidden', Number(panel.dataset.exercisePanel) !== index));
    };
    tabs.forEach((tab) => tab.addEventListener('click', () => activateExercise(Number(tab.dataset.exerciseTab))));
    qs('[data-next-exercise]', workout)?.addEventListener('click', () => {
      const currentPosition = tabs.findIndex((tab) => Number(tab.dataset.exerciseTab) === activeIndex);
      const next = tabs[Math.min(currentPosition + 1, tabs.length - 1)];
      if (next && currentPosition < tabs.length - 1) {
        activateExercise(Number(next.dataset.exerciseTab));
        next.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        showToast('Último exercício do treino.');
      }
    });
  }

  // Coordinator user search.
  const userSearch = qs('[data-user-search]');
  if (userSearch) {
    userSearch.addEventListener('input', () => {
      const query = userSearch.value.trim().toLocaleLowerCase('pt-BR');
      qsa('[data-user-row]').forEach((row) => {
        row.hidden = query && !row.textContent.toLocaleLowerCase('pt-BR').includes(query);
      });
    });
  }

  // Professor semaphore review actions.
  qsa('[data-health-alert]').forEach((alert) => {
    qsa('[data-semaphore-action]', alert).forEach((button) => {
      button.addEventListener('click', () => {
        const action = button.dataset.semaphoreAction;
        const title = qs('.health-alert-title span', alert);
        if (action === 'confirm') {
          alert.classList.remove('health-red', 'health-green', 'is-discarded');
          alert.classList.add('health-gold');
          if (title) title.textContent = 'Cuidado confirmado';
          showToast('Sinal amarelo confirmado.');
        } else if (action === 'red') {
          alert.classList.remove('health-gold', 'health-green', 'is-discarded');
          alert.classList.add('health-red');
          if (title) title.textContent = 'Bloqueio';
          showToast('Sinal alterado para vermelho.');
        } else if (action === 'discard') {
          alert.classList.add('is-discarded');
          if (title) title.textContent = 'Sugestão descartada';
          showToast('Sugestão descartada nesta demonstração.');
        }
      });
    });
  });

  // Intern workflow: beneficiary filter/selection and local exercise builder.
  const beneficiarySearch = qs('[data-beneficiary-search]');
  if (beneficiarySearch) {
    beneficiarySearch.addEventListener('input', () => {
      const query = beneficiarySearch.value.trim().toLocaleLowerCase('pt-BR');
      qsa('[data-beneficiary-item]').forEach((item) => {
        item.hidden = query && !item.textContent.toLocaleLowerCase('pt-BR').includes(query);
      });
    });
  }

  qsa('[data-beneficiary-item]').forEach((item) => {
    item.addEventListener('click', () => {
      qsa('[data-beneficiary-item]').forEach((row) => row.classList.remove('is-selected'));
      item.classList.add('is-selected');
      const name = item.dataset.beneficiaryName || 'Beneficiário';
      const selected = qs('[data-selected-beneficiary]');
      const trainingName = qs('[data-training-name]');
      if (selected) selected.textContent = name;
      if (trainingName) trainingName.value = `Treino — ${name}`;
    });
  });

  const builder = qs('[data-workout-builder]');
  if (builder) {
    const list = qs('[data-exercise-builder-list]', builder);
    const addButton = qs('[data-add-exercise]', builder);
    addButton?.addEventListener('click', () => {
      const source = qs('[data-exercise-builder-card]', builder);
      if (!source || !list) return;
      const clone = source.cloneNode(true);
      const number = qsa('[data-exercise-builder-card]', list).length + 1;
      const numberOutput = qs('[data-exercise-number]', clone);
      if (numberOutput) numberOutput.textContent = number;
      qsa('input', clone).forEach((input) => {
        if (input.type === 'number') input.value = input.name?.includes('series') ? '3' : input.value;
        else input.value = '';
      });
      list.appendChild(clone);
      qs('input', clone)?.focus();
    });

    qs('[data-demo-builder]', builder)?.addEventListener('submit', (event) => {
      event.preventDefault();
      showToast('Treino enviado para aprovação do professor.');
    });
  }

  // Anamnesis controls. Data remains local to the browser in this frontend demo.
  const anamnesis = qs('[data-anamnesis]');
  if (anamnesis) {
    qsa('[data-single-choice]', anamnesis).forEach((group) => {
      qsa('.choice-chip', group).forEach((chip) => {
        chip.addEventListener('click', () => {
          qsa('.choice-chip', group).forEach((item) => item.classList.remove('is-selected'));
          chip.classList.add('is-selected');
        });
      });
    });

    qsa('[data-multi-choice]', anamnesis).forEach((group) => {
      qsa('.choice-chip', group).forEach((chip) => {
        chip.addEventListener('click', () => {
          const isNone = ['nenhuma', 'nenhum'].includes(chip.textContent.trim().toLocaleLowerCase('pt-BR'));
          if (isNone) {
            qsa('.choice-chip', group).forEach((item) => item.classList.remove('is-selected'));
            chip.classList.add('is-selected');
            return;
          }
          qsa('.choice-chip', group).forEach((item) => {
            const label = item.textContent.trim().toLocaleLowerCase('pt-BR');
            if (['nenhuma', 'nenhum'].includes(label)) item.classList.remove('is-selected');
          });
          chip.classList.toggle('is-selected');
        });
      });
    });

    qsa('[data-range]', anamnesis).forEach((range) => {
      const output = qs(`[data-range-output="${range.dataset.range}"]`, anamnesis);
      const render = () => { if (output) output.textContent = `${range.value}/10`; };
      range.addEventListener('input', render);
      render();
    });

    qsa('[data-save-anamnesis]', anamnesis).forEach((link) => {
      link.addEventListener('click', () => {
        const step = anamnesis.dataset.step || '1';
        const payload = {
          fields: Object.fromEntries(qsa('input[name], select[name], textarea[name]', anamnesis).map((field) => [field.name, field.type === 'checkbox' ? field.checked : field.value])),
          choices: qsa('.choice-chip.is-selected', anamnesis).map((chip) => chip.textContent.trim()),
        };
        try { window.localStorage.setItem(`eurohealth360.anamnese.${step}`, JSON.stringify(payload)); } catch (_) { /* storage is optional */ }
      });
    });
  }
})();
