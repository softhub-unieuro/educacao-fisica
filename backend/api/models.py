from django.db import models
from django.contrib.auth.models import User

# Create your models here


class Aluno(models.Model):
    """Modelo para representar alunos."""
    nome = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    cpf = models.CharField(max_length=14, unique=True)
    data_nascimento = models.DateField()
    telefone = models.CharField(max_length=20, blank=True)
    endereco = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'alunos'
        ordering = ['nome']

    def __str__(self):
        return self.nome


class Professor(models.Model):
    """Modelo para representar professores."""
    nome = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    cpf = models.CharField(max_length=14, unique=True)
    especialidade = models.CharField(max_length=100)
    registro_profissional = models.CharField(max_length=50)
    telefone = models.CharField(max_length=20, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'professores'
        ordering = ['nome']

    def __str__(self):
        return self.nome


class Modalidade(models.Model):
    """Modelo para representar modalidades esportivas."""
    nome = models.CharField(max_length=100, unique=True)
    descricao = models.TextField()
    requisitos = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'modalidades'
        ordering = ['nome']

    def __str__(self):
        return self.nome


class Turmas(models.Model):
    """Modelo para representar turmas."""
    nome = models.CharField(max_length=100)
    modalidade = models.ForeignKey(Modalidade, on_delete=models.CASCADE, related_name='turmas')
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE, related_name='turmas')
    alunos = models.ManyToManyField(Aluno, related_name='turmas', blank=True)
    horario = models.CharField(max_length=100)
    dia_semana = models.CharField(max_length=50)
    capacidade_maxima = models.PositiveIntegerField(default=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'turmas'
        ordering = ['nome']

    def __str__(self):
        return f"{self.nome} - {self.modalidade.nome}"