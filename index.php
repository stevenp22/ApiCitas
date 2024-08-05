<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Citas Medicas Tomas</title>
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="estilos/styles.css">
    <script src="https://www.google.com/recaptcha/enterprise.js?render=6LeV-QoqAAAAABw3V7KI_B40KowW_pRQtK6lHse3"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
</head>
<body>
    <div id="modal" class="modal">
        <div class="modal-background"></div>
        <div class="modal-content" id="modalContent">
            <span class="close-btn" id="closeModalBtn">&times;</span>
            <div class="icon">
                <img src="assets/png/peligro.png" alt="Warning Icon">
            </div>
            <h2>USUARIO NO ENCONTRADO</h2>
            <p>El usuario ingresado <strong>no se encuentra en la base de datos.</strong><br>Por favor, verifique los datos e inténtelo de nuevo.</p>
            <button id="acceptBtn">Aceptar</button>
        </div>
    </div>
    <div class="main-container">
        <div class="container">
            <button type="button" class="btn btn-default btn-back">← Atrás</button>
            <h3>Por favor, ingrese su <strong>número de cédula y tipo de documento</strong></h3>
            <div class="container-inputs">  
                <h5>Tipo de documento</h5>
                <select class="form-control">
                    <option>Tipo de documento</option>
                    <option>Cédula de Ciudadanía</option>
                    <option>Tarjeta de Identidad</option>
                    <option>Cédula de Extranjería</option>
                    <option>Pasaporte</option>
                </select><br>
                
                <h5>Número de documento</h5>
                <input type="text" placeholder="Número de documento" class="form-control" ><br>
                <button type="button" class="btn btn-primary" id="showModalBtn" style="width: 100%;">Buscar cita</button>
                <div class="captcha-btn">
                    <!--div class="g-recaptcha" data-sitekey="6LeV-QoqAAAAABw3V7KI_B40KowW_pRQtK6lHse3"></!--div-->
                </div>
            </div>
        </div>
    </div>
    <footer>0
    <div class="bear-image"></div>
    <div class="logos-image"></div>
    <div class="logo-hdtuu-image"></div>
    </footer>
    

    <script>
        function onClick(e) {
            e.preventDefault();
            grecaptcha.enterprise.ready(async () => {
                const token = await grecaptcha.enterprise.execute('6LeV-QoqAAAAABw3V7KI_B40KowW_pRQtK6lHse3', {action: 'LOGIN'});
            });
        }

        document.getElementById('showModalBtn').addEventListener('click', function() {
            document.getElementById('modal').style.display = 'flex';
            document.getElementById('modalContent').classList.add('slide-in');
        });

        document.getElementById('closeModalBtn').addEventListener('click', function() {
            document.getElementById('modal').style.display = 'none';
        });

        document.getElementById('acceptBtn').addEventListener('click', function() {
            document.getElementById('modal').style.display = 'none';
        });

        // Close the modal if the user clicks anywhere outside of the modal
        window.onclick = function(event) {
            if (event.target == document.getElementById('modal')) {
                document.getElementById('modal').style.display = 'none';
            }
        }
    </script>
</body>
</html>
