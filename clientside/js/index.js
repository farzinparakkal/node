async function getdonor(params) {
    const res=await fetch('http://localhost:4000/getdonors')
    .then((user)=>{
        console.log("users: ",user);
        user.json()

        .then((parsed_data)=>{
            console.log(parsed_data);

            let container=document.getElementById("display")
            let card=''
            console.log(parsed_data.length);
            

            for(let i=0;i<(parsed_data.length);i++){
                card+=`<div class="cont1">
                        <div class="conttext">
                            <input type="text" value="${parsed_data[i].name}">
                            <input type="text" value="${parsed_data[i].email}">
                            <input type="text" value="${parsed_data[i].phone}">
                            <input type="text" value="${parsed_data[i].blood}">
                            <input type="text" value="${parsed_data[i].gender}">
                        </div>
                        <div class="contbtn">
                            <button class="editbtn">Edit</button>
                            <button class="savebtn">Save</button>
                            <button class="delbtn">Delete</button>
                        </div>
                        </div> <br>`
            }
            container.innerHTML=card

        })
        .catch((error)=>{
            console.log('error detected 2');  
        })  
    })
    .catch((error)=>{
        console.log('error detected 1');
    })
    
    
}

getdonor()