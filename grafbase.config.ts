import { graph, config, scalar } from '@grafbase/sdk'

const g = graph.Standalone()

const User = g.type("User", {
  id: g.id(),
  name: scalar.string().length({min:2, max: 20}),
  email: scalar.string().unique(),
  avatarUrl: g.url(),
  description: scalar.string().optional(),
  githubUrl: g.url().optional(),
  linkedInUrl: g.url().optional(),
  projects: g.relation(() => Project).list().optional(),
});

const Project = g.type("Project", {
  title: scalar.string(),
  description: scalar.string(),
  image: g.url(),
  liveSiteUrl: g.url(),
  gitHubUrl: g.url(),
  category: scalar.string(),
  createBy: g.relation(()=> User),
});

export default config({
  graph: g,
  cors: {
    allowedOrigins: '*',
  },
  auth: {
    rules: (rules) => {
      rules.public()
    },
  },
})
