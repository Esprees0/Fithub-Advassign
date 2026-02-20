// URL ของ Backend (ปรับตาม PORT ใน server.js ของคุณ)
const API_URL = "http://localhost:3000/api";

// 1. ฟังก์ชันส่งข้อมูล (POST)
document.getElementById('customerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const customerData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        memberLevel: document.getElementById('memberLevel').value,
        memberType: "Standard", // ค่า default ตามที่ backend ต้องการ
        memberStartDate: new Date().toISOString()
    };

    try {
        const response = await fetch(`${API_URL}/customers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerData)
        });

        if (response.ok) {
            alert('บันทึกข้อมูลสำเร็จ!');
            document.getElementById('customerForm').reset();
            loadCustomers(); // โหลดตารางใหม่
        } else {
            const err = await response.json();
            alert('เกิดข้อผิดพลาด: ' + err.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('ไม่สามารถเชื่อมต่อกับ Backend ได้');
    }
});

// 2. ฟังก์ชันดึงข้อมูลมาแสดง (GET)
async function loadCustomers() {
    try {
        const response = await fetch(`${API_URL}/customers`);
        const data = await response.json();
        
        const tbody = document.querySelector('#customerTable tbody');
        tbody.innerHTML = ''; // ล้างข้อมูลเก่า

        data.forEach(cust => {
            const row = `
                <tr>
                    <td>${cust.id}</td>
                    <td>${cust.name}</td>
                    <td>${cust.email}</td>
                    <td>${cust.memberLevel}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// โหลดข้อมูลทันทีเมื่อเปิดหน้าเว็บ
loadCustomers();