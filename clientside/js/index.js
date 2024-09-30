async function getdonor(params) {
    const res=await fetch('http://localhost:4000/getdonors')
    const data=await res.json()
    let card=``
    data.map((Datas)=>{

        card+=`<div class="cont1">
                        <div class="conttext">
                            <input type="text" id="name-${Datas._id}" disabled="true" value="${Datas.name}">
                            <input type="text" id="email-${Datas._id}" disabled="true" value="${Datas.email}">
                            <input type="text" id="phone-${Datas._id}" disabled="true" value="${Datas.phone}">
                            <input type="text" id="blood-${Datas._id}" disabled="true" value="${Datas.blood}">
                            <input type="text" id="gender-${Datas._id}" disabled="true" value="${Datas.gender}">
                        </div>
                        <div class="contbtn">
                            <button class="editbtn" onclick="handleEdit('${Datas._id}')">Edit</button>
                            <button class="savebtn">Save</button>
                            <button class="delbtn" onclick="handleDelete('${Datas._id}')">Delete</button>
                        </div>
                        </div> <br>`
            })
            document.getElementById("display").innerHTML=card
        }


getdonor()

function handleEdit(id){
    document.getElementById(`name-${id}`).disabled=false
    document.getElementById(`email-${id}`).disabled=false
    document.getElementById(`phone-${id}`).disabled=false
    document.getElementById(`blood-${id}`).disabled=false
    document.getElementById(`gender-${id}`).disabled=false
}

async function handleDelete(id){
    let res=await fetch('http://localhost:4000/delete',{
        method:"DELETE",
        headers:{"Content-Type":"text/plain"},
        body:id
    })
    if(res.status==200){
        alert("success")
        getdonor()
    }
    else{
        alert("failed")
    }
}