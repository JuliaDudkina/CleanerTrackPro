export default {
    async loadEmployees(context){
        const response = await fetch(
            'https://cleanertrackpro-default-rtdb.firebaseio.com/employees.json'
        );
        const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }

        let employees = [];

        for (const key in responseData) {
            const employee = {
                id: key,
                name: responseData[key].name,
                phone: responseData[key].phone,
                salary: responseData[key].salary,
                birthDate: responseData[key].birthDate,
                address: responseData[key].address,
                status: responseData[key].status,
            }
            employees.unshift(employee);
        }
        context.commit('setEmployees',employees)

    },
    async addEmployee(context,data){
        const newEmployee = {
            name: data.name,
            phone: data.phone,
            salary: data.salary,
            birthDate: data.birthDate,
            address: data.address,
            status: data.status,
        };

        const response = await fetch(
            'https://cleanertrackpro-default-rtdb.firebaseio.com/employees.json',
            {
                method: 'POST',
                body: JSON.stringify(newEmployee)
            }
        );

        if (!response.ok) {
            const error = new Error(response.message || 'Failed.Try Later');
            throw error;
        }

        context.commit('addEmployee', {
            ...newEmployee
        });
    },
    async deleteEmployee(context, data){
        const employeeId = data;

        const response = await fetch(`https://cleanertrackpro-default-rtdb.firebaseio.com/employees/${employeeId}.json`,
            {
                method: 'DELETE'
             }
        );

        if (!response.ok) {
            const error = new Error(response.message || 'Failed.Try Later');
            throw error;
        }
        context.commit('deleteEmployee', employeeId);
    },
    async loadNames(context){
        const response = await fetch(
            'https://cleanertrackpro-default-rtdb.firebaseio.com/employees.json'
        );
        const responseData = await response.json();
        let employeeNames = [];
        for (const key in responseData) {
            const employeeName = responseData[key].name;
            employeeNames.push(employeeName);
        }
        context.commit('setNames', employeeNames);
    },
    setEmployee(context,data) {
        const employee = data;
        context.commit('setEmployee', employee)
    },
    async updateEmployee(context, data){
        const employeeId = context.rootGetters.employee.id;
        const updatedEmployee = {
            name: data.name,
            address: data.address,
            phone: data.phone,
            salary: data.salary,
            birthDate: data.birthDate,
            status: data.status,
        };
        const response = await fetch(
            `https://cleanertrackpro-default-rtdb.firebaseio.com/employees/${employeeId}.json`,
            {
                method: 'PUT',
                body: JSON.stringify(updatedEmployee)
            }
        )
        if (!response.ok) {
            const error = new Error(response.message || 'Failed.Try Later');
            throw error;
        }
    },
}