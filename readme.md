# Requirement
- nodejs: v18.16.1
- mysql: 8.0

## Migrate

- Create database
```
yarn sequelize-dev db:create
```

- Create model
```
yarn sequelize-dev model:create --name user --attributes first_name:string,email:string,password:string --underscored
```

- Migrate
```
yarn sequelize-dev db:migrate
```

- Migrate rollback
```
yarn sequelize-dev db:migrate:undo
yarn sequelize-dev db:migrate:undo:all
```
