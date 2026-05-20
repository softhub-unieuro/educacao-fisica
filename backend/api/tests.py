from django.test import TestCase
from django.contrib.auth.models import User
from .models import Aluno, Professor, Modalidade, Turmas


class AlunoModelTest(TestCase):
    def setUp(self):
        self.aluno = Aluno.objects.create(
            nome="João Silva",
            email="joao@email.com",
            cpf="12345678901",
            data_nascimento="2000-01-15",
            telefone="11999999999"
        )

    def test_aluno_str(self):
        self.assertEqual(str(self.aluno), "João Silva")

    def test_aluno_cpf_unique(self):
        with self.assertRaises(Exception):
            Aluno.objects.create(
                nome="Maria",
                email="maria@email.com",
                cpf="12345678901",
                data_nascimento="2001-02-20"
            )


class ProfessorModelTest(TestCase):
    def setUp(self):
        self.professor = Professor.objects.create(
            nome="Prof. Carlos",
            email="carlos@email.com",
            cpf="98765432109",
            especialidade="Educação Física",
            registro_proficional="CREF12345"
        )

    def test_professor_str(self):
        self.assertEqual(str(self.professor), "Prof. Carlos")


class ModalidadeModelTest(TestCase):
    def setUp(self):
        self.modalidade = Modalidade.objects.create(
            nome="Futebol",
            descricao="Modalidade esportiva de campo",
            requisitos="bola, campos, juizes"
        )

    def test_modalidade_str(self):
        self.assertEqual(str(self.modalidade), "Futebol")


class TurmasModelTest(TestCase):
    def setUp(self):
        self.professor = Professor.objects.create(
            nome="Prof. Carlos",
            email="carlos@email.com",
            cpf="98765432109",
            especialidade="Educação Física",
            registro_proficional="CREF12345"
        )
        self.modalidade = Modalidade.objects.create(
            nome="Futebol",
            descricao="Modalidade esportiva"
        )
        self.turma = Turmas.objects.create(
            nome="Turma A",
            modalidade=self.modalidade,
            professor=self.professor,
            horario="14:00",
            dia_semana="Segunda",
            capacidade_maxima=25
        )

    def test_turma_str(self):
        self.assertEqual(str(self.turma), "Turma A - Futebol")