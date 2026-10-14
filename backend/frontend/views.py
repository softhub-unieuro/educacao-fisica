from django.http import Http404
from django.shortcuts import render


DEMO_USERS = [
    {"name": "Prof. Ricardo Alves", "profile": "Professor", "info": "Educação Física", "tone": "blue"},
    {"name": "Prof. Camila Rocha", "profile": "Professor", "info": "Fisioterapia", "tone": "blue"},
    {"name": "Pedro Mendes", "profile": "Estagiário", "info": "6º semestre", "tone": "gold"},
    {"name": "Ana Souza", "profile": "Estagiário", "info": "6º semestre", "tone": "gold"},
    {"name": "Lucas Lima", "profile": "Estagiário", "info": "5º semestre", "tone": "gold"},
    {"name": "João Silva", "profile": "Beneficiário", "info": "25 anos • Hipertrofia", "tone": "green"},
    {"name": "Maria Oliveira", "profile": "Beneficiário", "info": "32 anos • Emagrecimento", "tone": "green"},
    {"name": "Carlos Santos", "profile": "Beneficiário", "info": "40 anos • Reabilitação", "tone": "green"},
]

BENEFICIARIES = [
    {"initials": "JS", "name": "João Silva", "meta": "25 anos • Hipertrofia", "status": "Aprovado", "tone": "green"},
    {"initials": "MO", "name": "Maria Oliveira", "meta": "32 anos • Emagrecimento", "status": "Aguardando validação", "tone": "gold"},
    {"initials": "CS", "name": "Carlos Santos", "meta": "40 anos • Reabilitação funcional", "status": "Aguardando validação", "tone": "gold"},
    {"initials": "AC", "name": "Ana Costa", "meta": "22 anos • Condicionamento", "status": "", "tone": "neutral"},
]

FEEDBACKS = [
    {
        "name": "Maria Oliveira",
        "meta": "Treino B — Emagrecimento · há cerca de 6 horas",
        "text": "Senti um leve incômodo no ombro direito na elevação lateral. Consegui completar todas as séries.",
        "effort": "Esforço 7/10",
        "tone": "danger",
    },
    {
        "name": "Ana Costa",
        "meta": "Treino Full Body · há 1 dia",
        "text": "Treino confortável, sem dores. Poderia aumentar a carga do supino.",
        "effort": "Esforço 5/10",
        "tone": "warning",
    },
]


def _base_context(**extra):
    return {
        "campus": "Águas Claras",
        "product_name": "EuroHealth 360",
        **extra,
    }


def role_selector(request):
    return render(request, "frontend/role_selector.html", _base_context(page_title="Escolha seu perfil"))


def login_view(request):
    return render(request, "frontend/login.html", _base_context(page_title="Entrar"))


def signup_view(request):
    return render(request, "frontend/signup.html", _base_context(page_title="Criar cadastro"))


def beneficiary_dashboard(request):
    return render(
        request,
        "frontend/beneficiary_dashboard.html",
        _base_context(page_title="Resumo do beneficiário", role="Beneficiário"),
    )


def workout_view(request):
    exercises = [
        {"index": 1, "name": "Agachamento Livre", "sets": 3, "rest": "1:30", "active": True},
        {"index": 2, "name": "Supino Reto", "sets": 3, "rest": "1:00", "active": False},
        {"index": 3, "name": "Remada Baixa", "sets": 3, "rest": "1:00", "active": False},
        {"index": 4, "name": "Elevação Lateral", "sets": 3, "rest": "0:45", "active": False},
    ]
    return render(
        request,
        "frontend/workout.html",
        _base_context(page_title="Treino A", role="Beneficiário", exercises=exercises),
    )


def coordinator_dashboard(request):
    return render(
        request,
        "frontend/coordinator_dashboard.html",
        _base_context(
            page_title="Coordenação Geral",
            role="Coordenador",
            users=DEMO_USERS,
            feedbacks=FEEDBACKS,
        ),
    )


def professor_dashboard(request):
    approvals = [
        {"intern": "Pedro Mendes", "beneficiary": "João Silva", "exercises": 4, "sent": "há 2 dias", "status": "Aprovado", "tone": "green"},
        {"intern": "Ana Souza", "beneficiary": "Maria Oliveira", "exercises": 3, "sent": "há cerca de 5 horas", "status": "Aguardando", "tone": "gold"},
        {"intern": "Lucas Lima", "beneficiary": "Carlos Santos", "exercises": 2, "sent": "há cerca de 10 horas", "status": "Aguardando", "tone": "gold"},
    ]
    interns = [
        {"initials": "PM", "name": "Pedro Mendes", "meta": "Ed. Física — 6º sem.", "score": "9,0", "note": "9/10 · Excelente adequação às restrições da Fisioterapia. Continue."},
        {"initials": "AS", "name": "Ana Souza", "meta": "Ed. Física — 6º sem.", "score": "—", "note": ""},
        {"initials": "LL", "name": "Lucas Lima", "meta": "Ed. Física — 5º sem.", "score": "—", "note": ""},
        {"initials": "MC", "name": "Mariana Costa", "meta": "Ed. Física — 7º sem.", "score": "—", "note": ""},
    ]
    return render(
        request,
        "frontend/professor_dashboard.html",
        _base_context(
            page_title="Painel do professor",
            role="Professor",
            approvals=approvals,
            interns=interns,
            feedbacks=FEEDBACKS,
        ),
    )


def intern_dashboard(request):
    return render(
        request,
        "frontend/intern_dashboard.html",
        _base_context(
            page_title="Montagem de treino",
            role="Estagiário",
            beneficiaries=BENEFICIARIES,
            feedbacks=FEEDBACKS,
        ),
    )


def anamnesis_view(request, step):
    if step not in range(1, 6):
        raise Http404("Etapa de anamnese inexistente")
    return render(
        request,
        "frontend/anamnesis.html",
        _base_context(
            page_title=f"Super Anamnese — etapa {step}",
            role="Beneficiário",
            step=step,
            steps=range(1, 6),
        ),
    )
