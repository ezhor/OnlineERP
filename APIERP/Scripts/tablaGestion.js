﻿//window.addEventListener("load", );
var fila = 1;
var id;
var dataTable;
var tbody;
var tableHead;
var filasBorradas = 0;
var arraycosas = [];
var pedido;
var resultado;

function displayResult() {

   


   

    //document.getElementById("table1").insertRow(-1).innerHTML = '<td>Producto</td><td>Stock</td><td>Descripción</td><td>Cantidad</td><td>Precio Total</td>';
    dataTable = document.getElementById('table1');
    tableHead = document.getElementById('table-head');
    tbody = document.createElement('tbody');
    

    /*while (dataTable.firstChild) {
        dataTable.removeChild(dataTable.firstChild);
    }*/

    dataTable.appendChild(tableHead);
    var tr = document.createElement('tr'),
        td0 = document.createElement('td'),
        td1 = document.createElement('td'),
        td2 = document.createElement('td'),
        td3 = document.createElement('td'),
        td4 = document.createElement('td'),
        td5 = document.createElement('td'),
        td6 = document.createElement('td'),
        btnDelete = document.createElement('input');

    btnDelete.setAttribute('type', 'button');
    btnDelete.setAttribute('class', 'btnDelete');
    btnDelete.setAttribute('id', fila);
    btnDelete.setAttribute('value', "Eliminar");
    btnDelete.setAttribute('name', fila);

    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    id = "slcProductos" + fila;
    //$('.js-example-basic-single').select2;
    var select = document.createElement("SELECT");
    select.setAttribute('id', id);
    
    td0.appendChild(select);

    $(document).ready(function () {
        $("#" + id).select2();
    }).on("change", function () {
        //Si el nombre del producto elegido está en el array auxiliar, cambiar el seleccionado al por defecto
        for (var i = 0; i < arraycosas.length; i++) {
            if (arraycosas[i].Nombre === td0.firstChild.value) {
                productoSeleccionado = arraycosas[i];
            }
        }
    
    
    
        if (td0.firstChild.value === "") {
            td1.innerHTML = "";
            td2.innerHTML = "";
            td3.innerHTML = "";
            td4.innerHTML = "";
            td5.innerHTML = "";
        } else {
            var x = document.createElement("INPUT");
            x.setAttribute("type", "number");
            x.addEventListener("change", new function () {
                resultado = this.value * td4.innerHTML;
                td5.innerHTML = resultado;
            });
            //x.setAttribute("minValue", "1");
            x.min = "1";
            x.value = "1";
            x.max = "123";
            x.onkeypress = function (evt) {
                evt.preventDefault();
            };

        

            td1.innerHTML = productoSeleccionado.Stock; //stock de la api
            td2.innerHTML = productoSeleccionado.Descripcion;//descrupcion
            if (td3.firstChild == null) {
                td3.appendChild(x); //cantidad
            }
            td4.innerHTML = productoSeleccionado.PrecioUnitario;//precio
                //Meter producto en el array auxiliar
        }
    });
    
    //{ "ID":73, "Nombre":"Manta eléctrica", "Descripcion":"Manta eléctrica de alta calidad", "PrecioUnitario":12.5000, "Stock":-52, "Baja":true }
    //$(".slcProductos" + fila).select2();

    //arraycosas = ["volvo", "volvo"];


    var option = document.createElement("option");
    option.style.width = "200";
    option.value = "";
    option.text = "Seleccione un producto";
    td0.firstChild.appendChild(option);

    var XMLHTR = new XMLHttpRequest();
    if (XMLHTR) {
        XMLHTR.open('GET', '../api/productos');
        XMLHTR.onreadystatechange = function () {


            if (XMLHTR.readyState === 4 && XMLHTR.status === 200 || XMLHTR.readyState === 4 && XMLHTR.status === 204) {
                arraycosas = JSON.parse(XMLHTR.responseText);
                alert(arraycosas);

                for (var i = 0; i < arraycosas.length; i++) {
                    var option = document.createElement("option");
                    option.value = arraycosas[i].Nombre;
                    option.text = arraycosas[i].Nombre;
                    option.style.width = "200px";
                    //alert(arraycosas[i].Nombre);
                    td0.firstChild.appendChild(option);

                    



                }



            }
        }
        XMLHTR.send();
    }


    
    td6.appendChild(btnDelete);

    //AÑADE A CADA BOTON ELIMINAR UN LISTENER PARA EL METODO
    btnDelete.addEventListener("click", eliminarFila, false);

    tbody.appendChild(tr);
    
    dataTable.appendChild(tbody);
    fila++;
    //}
}

function confirmarPedido() {
    //alert("pedido hacido xd")
    var pedido = "";
    //gets table
    var oTable = document.getElementById('table1');

    //gets rows of table
    var rowLength = oTable.rows.length;

    //loops through rows    
    for (i = 1; i < rowLength; i++) {

        //gets cells of current row  
        var oCells = oTable.rows.item(i).cells;

        //gets amount of cells of current row
        var cellLength = oCells.length;

        //--------------HAY QUE HACER QUE LAS QUE NO SE VEN NO SE METAN EN EN PEDIDO--------------

        //if(se ve la row)
       
            //loops through each cell in current row
        for (var j = 0; j < cellLength; j++) {
            if ($(oTable.rows.item(i)).is(':visible')) {
                if (j == 0) {
                    pedido = pedido + oCells.item(j).firstChild.value + " ";
                    //alert(cellVal);
                } else if (j == 3) {
                    pedido = pedido + oCells.item(j).firstChild.value + " | ";
                    //alert(cellVal);
                }
            }
                // get your cell info here
                /*
                var cellVal = oCells.item(j).innerHTML;
                alert(cellVal);
                */
            }
    }
    document.getElementById("pedidoHecho").innerHTML = pedido;
    borrarTabla();
}

function eliminarFila() {
    if (document.getElementById("table1").childElementCount - 1 <= this.name) {
        document.getElementById("table1").rows.item(parseInt(this.name)).style.display = 'none';
    }

    else
    {
        document.getElementById("table1").rows.item(parseInt(this.name)).style.display = 'none';
    }
}

function borrarTabla() {

    for (var i = 1; i < document.getElementById("table1").rows.length; i++)
    {
        document.getElementById("table1").rows.item(i).style.display = 'none';
    }

}


function addPedido() {

    var nombreAdd = document.getElementById('formNombre').value;
    var apellidoAdd = document.getElementById('formApellido').value;
    var direccionAdd = document.getElementById('formDireccion').value;
    var telefonoAdd = document.getElementById('formTelefono').value;
    var fechaAdd = document.getElementById('formFecha').value;

    var persona = new Person(nombreAdd, apellidoAdd, direccionAdd, telefonoAdd, fechaAdd);

    var url = '../api/Persona';

    var json = JSON.stringify(persona);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == "204" /*|| xhr.status == "200"*/) {
            var modalbodyAdd = document.getElementById('modalbodyAdd');
            var divSuccess = document.createElement('div');
            divSuccess.setAttribute('class', 'alert alert-success');
            divSuccess.innerHTML = 'Persona ' + persona.Nombre + 'añadida exitosamente';
            listarPersonas();
        }
    }
    xhr.send(json);
}