from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Aluno, Professor, Modalidade, Turmas
from .serializers import (
    AlunoSerializer,
    ProfessorSerializer,
    ModalidadeSerializer,
    TurmasSerializer
)


class AlunoViewSet(viewsets.ModelViewSet):
    """ViewSet para Alunos."""
    queryset = Aluno.objects.all()
    serializer_class = AlunoSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['nome', 'cpf', 'email']
    ordering_fields = ['nome', 'created_at']
    ordering = ['nome']


class ProfessorViewSet(viewsets.ModelViewSet):
    """ViewSet para Professores."""
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['nome', 'cpf', 'email', 'especialidade']
    ordering_fields = ['nome', 'created_at']
    ordering = ['nome']


class ModalidadeViewSet(viewsets.ModelViewSet):
    """ViewSet para Modalidades."""
    queryset = Modalidade.objects.all()
    serializer_class = ModalidadeSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['nome', 'descricao']
    ordering_fields = ['nome']
    ordering = ['nome']


class TurmasViewSet(viewsets.ModelViewSet):
    """ViewSet para Turmas."""
    queryset = Turmas.objects.all()
    serializer_class = TurmasSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['modalidade', 'professor', 'dia_semana']
    search_fields = ['nome', 'horario']
    ordering_fields = ['nome', 'horario']
    ordering = ['nome']