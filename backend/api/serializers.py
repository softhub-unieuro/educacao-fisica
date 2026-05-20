from rest_framework import serializers
from .models import Aluno, Professor, Modalidade, Turmas


class AlunoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aluno
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class ModalidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modalidade
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class TurmasSerializer(serializers.ModelSerializer):
    modalidade_nome = serializers.CharField(source='modalidade.nome', read_only=True)
    professor_nome = serializers.CharField(source='professor.nome', read_only=True)
    alunos_count = serializers.SerializerMethodField()

    class Meta:
        model = Turmas
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

    def get_alunos_count(self, obj):
        return obj.alunos.count()