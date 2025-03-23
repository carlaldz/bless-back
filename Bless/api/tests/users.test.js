const request = require ("supertest"); ´
const app = require ("../web/src/App.jsx")

const mongoose = require ("mongoose"); 

beforeEach(() => {
    return mongoose.connection.db.dropDatabase(); 
}); 

describe ("Users CRUD", function(){
    it("happy path", async function() {
          let userId; 
            await request(app)
                .post("/api/users")
                .send ({
                    nombre: "John", 
                    apellidos: "Doe", 
                    email: "johndoe@example.com",
                    password: "Password123",
                })
                .then((res) => {
                    expect (res.statusCode).toBe(201)
                    expect(res.body).toMatchObject({
                        nombre: "John", 
                        apellidos: "Doe",
                        email: "johndoe@example.com",
                        id: expect.any(String), 
                        createdAt: expect.any(String), 
                        updatedAt: expect.any(String)

                    }); 

                    expect(res.body.password).toBeUndefined(); 

                    userId = res.body.id; 
                }); 
            //DETAIL
            
            await request(app)
            .get(`/api/users/${userId}`)
            // Then
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toMatchObject({
                name: "John Doe",
                email: "johndoe@example.com",
                id: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                });
            });

            //List 
            await request(app)
            .get("/api/users")
            .then((res) => {
                expect (res.statusCode).toBe(200)
                expect(res.body).toHaveLength(1); 
                expect(res.body[0]).toMatchObject({
                    nombre: "John", 
                    apellidos: "Doe",
                    email: "johndoe@example.com",
                    id: expect.any(String), 
                    createdAt: expect.any(String), 
                    updatedAt: expect.any(String)

                }); 
            }); 
                // UPDATE
            await request(app)
            // When
            .patch(`/api/users/${userId}`)
            .send({
            name: "Jane Doe",
            })
            .then((res) => {
            expect(res.statusCode).toBe(200);

            expect(res.body).toMatchObject({
                name: "Jane Doe",
            });
        });
        
        //Delete
        await request(app)

        .delete(`/api/users/${userId}`)
        .then((res) => {
            expect(res.statusCode).toBe(204); 
        }); 

        await request(app)
      // When
      .get(`/api/users/${userId}`)
      .then((res) => {
        expect(res.statusCode).toBe(404);
      });
  });

  it("email should be mandatory", async function () {
    await request(app)
      // When
      .post("/api/users")
      .send({
        name: "John Doe",
        password: "password",
      })
      // Then
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toMatchObject({
          message: "User validation failed: email: Path `email` is required.",
          errors: {
            email: "Path `email` is required.",
          },
        });
      });
  });
});