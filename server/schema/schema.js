// const { projects, clients } = require("../sampleData");

// mongoose models requiring for creating users
const Project = require("../models/project");
const Client = require("../models/client");

// creating graphql object types
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");
const project = require("../models/project");

// creating object for project type
const projectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: clientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

// creating object for client type
const clientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// creating root query object for getting all data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",

  fields: {
    // getting all projects
    projects: {
      type: new GraphQLList(projectType),
      resolve(parent, args) {
        return Project.find();
      },
    },

    // get a single project 

    project: {
      type: projectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },

    // get all clients
    clients: {
      type: new GraphQLList(clientType),
      resolve(parent, args) {
        return Client.find();
      },
    },


    // get a single client
    client: {
      type: clientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.find(args.id);
      },
    },
  },
});


// *******************************************************************


// Mutation to perform CRUD operations in graphQL
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // adding client in database through mutation
    addClient: {
      // what we are creating
      type: clientType,

      // arguments what fields we want to add
      args: {
        // GraphQLNonNull to not making name field null
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },

      // fetchig data from args provided in fieds
      resolve(parent, args) {
        // creating new client using mongoose model
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        // saving data from user in database by creating
        return client.save();
      },
    },

    // delete client
    deleteClient: {
      type: clientType,

      // fetching id from database
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      // deleting client related with id
      
      resolve(parent, args) {

        // deleting client & project both starts
        Project.find({clientId:args.id}).then((projects)=>{
          projects.forEach(project =>{
            project.remove();
          });
        });
        // deleting client & project both ends


        return Client.findByIdAndRemove(args.id);
      },
    },

    // adding projects
    addProject: {
      // what we are creating
      type: projectType,

      // arguments what fields we want to add
      args: {
        // GraphQLNonNull to not making name field null
        name: {
          type: GraphQLNonNull(GraphQLString),
        },

        description: {
          type: GraphQLNonNull(GraphQLString),
        },

        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },

        clientId: {
          type: GraphQLNonNull(GraphQLID),
        },
      },

      // fetchig data from args provided in fieds
      resolve(parent, args) {
        // creating new project using mongoose model
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });

        // saving data from user in database by creating
        return project.save();
      },
    },

    // delete project
    deleteProject: {
      type: projectType,

      // fetching id from database
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      // deleting client related with id
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id);
      },
    },

    // update a project
    updateProject: {
      type: projectType,

      // arguments what fields we want to update
      args: {
        id:{
          type: GraphQLNonNull(GraphQLID),
        },
        // GraphQLNonNull to not making name field null
        name: {
          type: GraphQLString,
        },

        description: {
          type: GraphQLString,
        },

        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },

      // updating project related with id
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },

          { new: true }
        );
      },
    },
  },
});



module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation, //either if variable set to myMutation so we could have {mutation:myMutation}
});
