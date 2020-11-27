const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test-api-db', {useNewUrlParser: true,useUnifiedTopology: true});
const Character = require('./models/Character')
// const nanoid = require('nanoid')
const typeDefs = gql`
    type Character{
        id:ID
        name:String
        status:String
        gender:String
        image:String
    }
    type Query{
        characters:[Character]
        character(id:ID):Character
    }
    type Mutation{
        addCharacter(name:String, status:String, gender:String, image:String):Character
    }
`
const data = require('./data')

const resolvers={
    Query:{
        characters:()=>data,
        character:(_,{id})=>{
            return data.find( character => character.id == id)
        },
    },
    Mutation:{
        addCharacter(_,payload){
                const storedCharacters={
                    id:1212121,
                    ...payload
                }
                data.push(storedCharacters);
                // return storedCharacters;
            return Character.create(payload)
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url})=>{
    console.log('Server is running on '+url)
})