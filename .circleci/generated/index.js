const CircleCI = require('@circleci/circleci-config-sdk');
// Instantiate new Config
const myConfig = new CircleCI.Config();
// Create new Workflow
const myWorkflow = new CircleCI.Workflow('myWorkflow');
myConfig.addWorkflow(myWorkflow);

// Create an executor instance
// Executors are used directly in jobs
// and do not need to be added to the config separately
const nodeExecutor = new CircleCI.executors.DockerExecutor('cimg/node:lts');
// Create Job and add it to the config
const nodeTestJob = new CircleCI.Job('echo-hello-world-test', nodeExecutor);
myConfig.addJob(nodeTestJob);

// Add steps to job
nodeTestJob
    .addStep(new CircleCI.commands.Checkout())
    .addStep(
        new CircleCI.commands.Run({
            command: 'echo hello world',
            name: 'echo test',
        }));

// Add Jobs to Workflow
myWorkflow.addJob(nodeTestJob);

// The `stringify()` function on `CircleCI.Config` will return the CircleCI YAML equivalent.
const MyYamlConfig = myConfig.stringify();

// Save the config to a file in Node.js or the browser. Note, use in the browser requires user interaction.....
myConfig.writeFile('basic_workflow.yml');
