<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Citas Medicas Tomas Consultas</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.2.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="estilos/consulta-estilos.css">
    <script src="https://www.google.com/recaptcha/enterprise.js?render=6LeV-QoqAAAAABw3V7KI_B40KowW_pRQtK6lHse3"></script>
    <script src="https://cdn.datatables.net/1.13.4/css/dataTables.bootstrap5.min.css"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/dataTables.bootstrap5.min.js"></script>
</head>
<body>
    
    <div class="content-main">
        <button type="button" class="btn btn-default btn-back">← Salir</button>
        <div class="content-user row justify-content-end">
            <div class="col-8">
                <h3>66714956</h3> <!-- Aquí va el número de cédula del usuario -->
            </div>
            <div class="col-4">
                <div class="img-user"></div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-12 col-lg-7">
                <div class="card shadow mb-4">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-">Tabla de Usuarios</h6>
                        <button id="" type="submit" class="btn btn-success" onclick="exportarExcel()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-arrow-down-fill" viewBox="0 0 16 16">
                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z"/>
                            </svg>
                            Exportar Usuarios
                        </button>   
                    </div>
                    <div class="card-body table-responsive">
                        <table id="tabla" class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Rol</th>
                                    <th>Usuario</th>
                                    <th>Institucion</th>
                                    <th>Municipio</th>
                                    <th>Fecha Creacion</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>a</td>
                                    <td>a</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                    <form style='all: initial;' action='crearUsuario.php' method='post'>
                                        <button type='btn-submit' class='btn btn-success' title='Desactivar Usuario'>
                                            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-person-fill-check' viewBox='0 0 16 16'>
                                                <path d='M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'/>
                                                <path d='M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z'/>
                                            </svg>
                                        </button>
                                        <input type='hidden' name='id' value=".$id." >
                                        <input type='hidden' name='estado' value='Inactivo' >
                                    </form>
                                    </td>
                                    
                                
                                    <td>
                                    <form style='all: initial;' action='crearUsuario.php' method='post'>
                                        <input type='hidden' name='estado' value=true >
                                        <button type='submit' class='btn btn-danger' title='Activar Usuario'>
                                        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-person-fill-x' viewBox='0 0 16 16'>
                                            <path d='M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z'></path>
                                            <path d='M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708Z'></path>
                                        </svg>
                                        </button>
                                        <input type='hidden' name='id' value=".$id." >
                                        <input type='hidden' name='estado' value='Activo' >
                                    </form>
                                    </td>
                                </tr>   
                                <tr>
                                    <td>a</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                    <form style='all: initial;' action='crearUsuario.php' method='post'>
                                        <button type='btn-submit' class='btn btn-success' title='Desactivar Usuario'>
                                            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-person-fill-check' viewBox='0 0 16 16'>
                                                <path d='M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'/>
                                                <path d='M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z'/>
                                            </svg>
                                        </button>
                                        <input type='hidden' name='id' value=".$id." >
                                        <input type='hidden' name='estado' value='Inactivo' >
                                    </form>
                                    </td>
                                
                                    <td>
                                    <form style='all: initial;' action='crearUsuario.php' method='post'>
                                        <input type='hidden' name='estado' value=true >
                                        <button type='submit' class='btn btn-danger' title='Activar Usuario'>
                                        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-person-fill-x' viewBox='0 0 16 16'>
                                            <path d='M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z'></path>
                                            <path d='M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708Z'></path>
                                        </svg>
                                        </button>
                                        <input type='hidden' name='id' value=".$id." >
                                        <input type='hidden' name='estado' value='Activo' >
                                    </form>
                                    </td>
                                </tr>    
                            </tbody>
                        </table>
                    </div> 
                </div>
            </div>   
        </div>

    </div>
    
    <div class="logos-image"></div>
    <div class="logo-hdtuu-image"></div>
</body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
    <script src="datatable.js"></script>
    </html>