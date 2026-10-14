from django.urls import path

from . import views

app_name = "frontend"

urlpatterns = [
    path("", views.role_selector, name="role-selector"),
    path("login/", views.login_view, name="login"),
    path("cadastro/", views.signup_view, name="signup"),
    path("demo/coordenador/", views.coordinator_dashboard, name="coordinator"),
    path("demo/professor/", views.professor_dashboard, name="professor"),
    path("demo/estagiario/", views.intern_dashboard, name="intern"),
    path("demo/beneficiario/", views.beneficiary_dashboard, name="beneficiary"),
    path("demo/beneficiario/treino/", views.workout_view, name="workout"),
    path("anamnese/<int:step>/", views.anamnesis_view, name="anamnesis"),
]
