// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBIo48XT0ACWZBQ_MlwLr4537PdADLkxqc",
    authDomain: "bd3-nosql-juliaalves.firebaseapp.com",
    projectId: "bd3-nosql-juliaalves",
    storageBucket: "bd3-nosql-juliaalves.appspot.com",
    messagingSenderId: "271810522657",
    appId: "1:271810522657:web:0eaf48beabbad830eb7d60",
    measurementId: "G-WCFG95H7L7"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Referências aos elementos do HTML
const addStudentForm = document.getElementById('addStudentForm');
const studentList = document.getElementById('studentList');
const deleteStudentForm = document.getElementById('deleteStudentForm');

// Função para adicionar aluno
addStudentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(addStudentForm);
    const studentData = Object.fromEntries(formData.entries());
    // Converte a data de nascimento para um objeto Date
    studentData.data_nascimento = new Date(studentData.data_nascimento);
    db.collection("alunos").add(studentData)
        .then(() => {
            console.log("Aluno adicionado com sucesso");
            addStudentForm.reset();
        })
        .catch((error) => {
            console.error("Erro ao adicionar aluno: ", error);
        });
});

// Função para listar alunos
function listStudents() {
    db.collection("alunos").get().then((querySnapshot) => {
        studentList.innerHTML = ''; // Limpa a lista antes de exibir os alunos
        querySnapshot.forEach((doc) => {
            const student = doc.data();
            const listItem = document.createElement('li');
            // Formata a data de nascimento para exibição
            const data_nascimento = new Date(student.data_nascimento);
            const formattedDataNascimento = data_nascimento.toLocaleDateString('pt-BR');
            // Exibe os dados do aluno
            listItem.textContent = `ID: ${doc.id}, Nome: ${student.nome}, CPF: ${student.CPF}, RG: ${student.RG}, Telefone Aluno: ${student.telefone_aluno}, Telefone Responsável: ${student.telefone_responsavel}, Email: ${student.email}, Data de Nascimento: ${formattedDataNascimento}`;
            studentList.appendChild(listItem);
        });
    });
}

// Função para excluir aluno
deleteStudentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const studentId = deleteStudentForm.querySelector('input').value;
    db.collection("alunos").doc(studentId).delete().then(() => {
        console.log("Aluno excluído com sucesso");
        deleteStudentForm.reset();
    }).catch((error) => {
        console.error("Erro ao excluir aluno: ", error);
    });
});

// Inicializa a lista de alunos ao carregar a página
window.addEventListener('load', listStudents);
