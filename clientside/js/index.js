// alert("hi")
async function getemployee() {
    const res = await fetch('http://localhost:3000/getemployee');
    const data = await res.json();
    let card = '';
    data.map((Datas) => {
        card += `
        <div>
            <div><img src="../image/icons8-user-90.png" alt=""></div>
            <div>${Datas.empId}</div>
            <div>${Datas.name}</div>
            <div>${Datas.des}</div>
            <button onclick="location.href='http://localhost:3000/info.html?empId=${Datas.empId}'">Info</button>
        </div>`;
    });
    document.getElementById("container").innerHTML = card;
}



getemployee()