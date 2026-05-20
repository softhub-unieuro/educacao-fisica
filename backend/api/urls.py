from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AlunoViewSet, ProfessorViewSet, ModalidadeViewSet, TurmasViewSet

router = DefaultRouter()
router.register(r'alunos', AlunoViewSet, basename='aluno')
router.register(r'professores', ProfessorViewSet, basename='professor')
router.register(r'modalidades', ModalidadeViewSet, basename='modalidade')
router.register(r'turmas', TurmasViewSet, basename='turma')

urlpatterns = [
    path('', include(router.urls)),
]