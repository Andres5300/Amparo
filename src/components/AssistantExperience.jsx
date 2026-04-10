import { useEffect, useMemo, useRef, useState } from 'react';
import SectionTitle from './SectionTitle';

const QUESTIONS = [
  {
    key: 'caseType',
    question: 'Para orientarte mejor, ¿qué situación se parece más a la tuya?',
    options: [
      { label: 'EPS no autoriza tratamiento', value: 'eps' },
      { label: 'Me suspendieron agua o luz', value: 'services' },
      { label: 'El banco no responde', value: 'bank' },
      { label: 'Entidad pública sin respuesta', value: 'public' },
      { label: 'Ninguna de las anteriores', value: 'other' }
    ]
  },
  {
    key: 'status',
    question: '¿En qué estado está tu caso hoy?',
    options: [
      { label: 'Ya envié solicitud y no contestan', value: 'no-response' },
      { label: 'Me negaron por escrito', value: 'denied' },
      { label: 'Es urgente y afecta mi salud', value: 'urgent-health' },
      { label: 'No estoy seguro todavía', value: 'unsure' }
    ]
  },
  {
    key: 'goal',
    question: '¿Qué quieres lograr primero?',
    options: [
      { label: 'Obtener una respuesta formal', value: 'formal-response' },
      { label: 'Proteger un derecho fundamental', value: 'protect-right' },
      { label: 'Tener una guía clara para radicar', value: 'filing-guide' }
    ]
  }
];

const initialAssistantMessage = {
  role: 'assistant',
  content:
    'Hola, soy el asistente de Amparo. Te haré preguntas simples para recomendarte si debes iniciar con tutela o derecho de petición.',
  timestamp: 'Ahora'
};

const summarizeRecommendation = (answers) => {
  const isTutelaCase =
    answers.caseType === 'eps' ||
    answers.caseType === 'services' ||
    answers.goal === 'protect-right' ||
    answers.status === 'urgent-health';

  const documentType = isTutelaCase ? 'tutela' : 'derecho de petición';

  return {
    documentType,
    steps: [
      `Documento recomendado: ${documentType}.`,
      'Recolecta hechos en orden cronológico con fechas aproximadas.',
      'Identifica la entidad responsable y el derecho vulnerado.',
      'Te daremos formato, checklist de anexos y guía de radicación.'
    ]
  };
};

const AssistantExperience = () => {
  const [messages, setMessages] = useState([
    initialAssistantMessage,
    { role: 'assistant', content: QUESTIONS[0].question, timestamp: 'Ahora' }
  ]);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const recognitionRef = useRef(null);
  const scrollerRef = useRef(null);

  const currentQuestion = stepIndex < QUESTIONS.length ? QUESTIONS[stepIndex] : null;
  const progressPercent = useMemo(
    () => Math.round((Math.min(stepIndex, QUESTIONS.length) / QUESTIONS.length) * 100),
    [stepIndex]
  );

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    setSpeechSupported(true);
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-CO';
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        transcript += event.results[i][0].transcript;
      }
      setInputValue(transcript.trim());
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
  }, [messages]);

  const appendMessage = (role, content) => {
    setMessages((prev) => [...prev, { role, content, timestamp: 'Ahora' }]);
  };

  const finishFlow = (newAnswers) => {
    const summary = summarizeRecommendation(newAnswers);
    appendMessage(
      'assistant',
      `Perfecto. Con lo que me cuentas, deberías empezar con ${summary.documentType}.\n\n${summary.steps
        .map((item, idx) => `${idx + 1}. ${item}`)
        .join('\n')}`
    );
    appendMessage(
      'assistant',
      'Cuando quieras, el siguiente paso real es completar el formulario guiado para generar el documento final.'
    );
    setStepIndex(QUESTIONS.length);
  };

  const processAnswer = (value, label) => {
    if (!currentQuestion) {
      appendMessage(
        'assistant',
        'Ya tengo una recomendación base. Si quieres, podemos reiniciar y afinar el caso con más detalle.'
      );
      return;
    }

    const selectedLabel = label || value;
    const newAnswers = { ...answers, [currentQuestion.key]: value };

    appendMessage('user', selectedLabel);
    setAnswers(newAnswers);

    const nextIndex = stepIndex + 1;
    if (nextIndex < QUESTIONS.length) {
      setStepIndex(nextIndex);
      appendMessage('assistant', QUESTIONS[nextIndex].question);
      return;
    }

    finishFlow(newAnswers);
  };

  const handleOptionClick = (option) => {
    if (option.value === 'other') {
      appendMessage('user', option.label);
      appendMessage(
        'assistant',
        'Cuéntame brevemente qué pasó. Puedes escribirlo o usar el micrófono y yo adapto la ruta.'
      );
      return;
    }

    processAnswer(option.value, option.label);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    setInputValue('');
    processAnswer(trimmed, trimmed);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    recognitionRef.current.start();
    setIsListening(true);
  };

  const restartFlow = () => {
    setMessages([initialAssistantMessage, { role: 'assistant', content: QUESTIONS[0].question, timestamp: 'Ahora' }]);
    setAnswers({});
    setInputValue('');
    setStepIndex(0);
    setIsListening(false);
    if (recognitionRef.current) recognitionRef.current.stop();
  };

  return (
    <section id="asistente-ia" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <SectionTitle
          eyebrow="Siguiente experiencia"
          title="Asistente conversacional guiado"
          description="La idea no es un chat frío: es una experiencia intuitiva con opciones rápidas, entrada libre y voz para construir la ruta legal correcta."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <aside
            data-reveal
            className="rounded-3xl border border-emerald-100 bg-gradient-to-b from-emerald-50 to-white p-6 shadow-card"
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">Diseñado para conversión</p>
            <h3 className="mt-2 text-2xl font-extrabold text-slate-900">Interacción clara, cero fricción</h3>
            <p className="mt-3 text-slate-600">
              El usuario avanza por decisiones guiadas. Si ninguna opción le aplica, puede escribir o
              hablar. Esto reduce abandono y acelera la decisión.
            </p>

            <div className="mt-6 rounded-2xl border border-white/80 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-800">Progreso del flujo</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-emerald-100">
                <div
                  className="h-full rounded-full bg-emerald-600 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-slate-600">
                {stepIndex < QUESTIONS.length
                  ? `Paso ${stepIndex + 1} de ${QUESTIONS.length}`
                  : 'Ruta recomendada lista'}
              </p>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              <li className="rounded-xl bg-white px-4 py-3 shadow-sm">Botones de respuesta rápida</li>
              <li className="rounded-xl bg-white px-4 py-3 shadow-sm">Campo abierto para detalles</li>
              <li className="rounded-xl bg-white px-4 py-3 shadow-sm">Transcripción por voz integrada</li>
            </ul>

            <button
              type="button"
              onClick={restartFlow}
              className="mt-6 rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
            >
              Reiniciar demo
            </button>
          </aside>

          <div
            data-reveal
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_40px_-28px_rgba(2,132,199,0.35)]"
          >
            <header className="flex items-center justify-between border-b border-slate-100 bg-white px-4 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-base font-bold text-white">
                  IA
                </span>
                <div>
                  <p className="font-bold text-slate-900">Asistente Amparo</p>
                  <p className="text-xs text-slate-500">Modo guiado para tutela y derecho de petición</p>
                </div>
              </div>
              <span className="rounded-full bg-warm-100 px-3 py-1 text-xs font-semibold text-warm-700">
                Demo UX
              </span>
            </header>

            <div
              ref={scrollerRef}
              className="amparo-scroll h-[420px] space-y-4 overflow-y-auto bg-slate-50/80 px-4 py-5 sm:px-6"
            >
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm sm:max-w-[82%] ${
                    message.role === 'assistant'
                      ? 'bg-white text-slate-700'
                      : 'ml-auto bg-emerald-600 text-white'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.content}</p>
                  <p
                    className={`mt-2 text-[11px] ${
                      message.role === 'assistant' ? 'text-slate-400' : 'text-emerald-100'
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 bg-white px-4 py-4 sm:px-6">
              {currentQuestion ? (
                <div className="mb-3 flex flex-wrap gap-2">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleOptionClick(option)}
                      className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:-translate-y-0.5 hover:bg-emerald-100"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
                <label htmlFor="amparo-input" className="sr-only">
                  Escribe tu respuesta
                </label>
                <input
                  id="amparo-input"
                  type="text"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="Si prefieres, escribe aquí tu caso..."
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                />

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Enviar
                  </button>
                  <button
                    type="button"
                    onClick={toggleListening}
                    disabled={!speechSupported}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      speechSupported
                        ? isListening
                          ? 'bg-warm-500 text-slate-900 hover:bg-warm-300'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        : 'cursor-not-allowed bg-slate-100 text-slate-400'
                    }`}
                    aria-pressed={isListening}
                  >
                    {speechSupported ? (isListening ? 'Escuchando...' : 'Voz') : 'Sin voz'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssistantExperience;