# angular-meteor-seed

## Installation

```
$ git clone https://github.com/aocarina/angular-meteor-seed.git

$ meteor
```

## Tutorial: Creating a new screen

In this tutorial we will create a screen called Projects using the seed. It will be accessible by the sidebar.

###Main structure

The screens accessible by the sidebar are each in the modules folder. Each module has four folders:

* Adapters
* Controllers
* Lib
* Views.

They also have a facade in the facades folder.

In order to create this new screen, we will need to understand this structure and how to link the module with the rest of the app.

###First steps

First we need to create a projects folder in the modules folder. We could copy the subfolders from one of the existing screens and edit, but for this tutorial we will create them from scratch.

After creating the four subfolders we will need to create the screen's files. We will proceed folder by folder.

We will begin by creating a file in the lib folder. Name it projects.app.js. This file will contain the module dependencies and state routing.

```
// Module declaration
var app = angular.module( 'modules.projects', [
  'angular-meteor',
  'ui.router'
]);
```

```
// Helper variable to create the paths to the views
var config = {
  templatePath: 'client/modules/projects/views/'
}

// This is the configuration for the screen states
app.config([ '$stateProvider', '$urlRouterProvider', function( $stateProvider, $urlRouterProvider ) {

  // Set the main state
  $stateProvider
    .state( 'projects', {
      parent: 'root',
      // Just a simple view. The contents path will load the defined view. In our case projects.ng.jade
      views: {
        'content': { templateUrl: config.templatePath + 'projects.html' }
      }
    });

}]);
```

Now we type the following line in app.js.

```
//Add the new module to the project dependencies
var app = angular.module( appName, [
  ...
  'modules.projects'

]);
```
Ok, we have a module! But we still need a view and a way to access it.

Create a file named projects.ng.jade in projects/views with the following code.

```
div.users( ng-controller="global.crud", data-form-size="4" )
  .wrapper.wrapper-content.animated.fadeInRight
    .row
      p Hello!
```
This will be the main view. Through it we can add other views and populate the screen.

Now add this code to the navbar.side.ng.jade in modules/navbar/views to add button.

```
li( ui-sref-active="active" )
  // Notice this line. This will link the button to the state we defined earlier.
  // If we click, the state will be changed to projects and the state content will be loaded.
  a( ui-sref="projects" )
    i.fa.fa-th-large
    span.nav-label Projects
```

After that, we should have a new screen fully functional in the sidebar. With just two files and some code.
This new screen is pretty barebones though, so we will add some features to it.

---

##Editing the view and adding controllers

We now have a working view and some states. To add new features to the screen we need to first create some new states.

It's not actually needed to create new states, but it will be more consistent and elegant if we do.

---

###Adding more views and states

```
...
$stateProvider

  .state( 'projects', {
    parent: 'root',
    // Since we are using this particular view just to insert the other views, we should set the abstract property to true // so the state can't be transitioned to.
    abstract: true,
    views: {
      'content': { templateUrl: config.templatePath + 'projects.html' }
    }
  })
  .state( 'projects.crud', {
    // Notice this property. We are creating two views in the state crud, which is a child
    // state of the state projects (which is a child state of root).
    // They are name 'list' and 'form'. This way we can have a main jade file that just includes those two views
    // instead of a big file containing all the code
    views: {
      'list': { templateUrl: config.templatePath + 'projects.list.html' },
      'form': { templateUrl: config.templatePath + 'projects.form.html' }
    }
  });
```
Update the button in the navbar.side.ng.jade

```
//We are now transitioning to the child state crud. Since the parent is now abstract, we can't transition to it.
a( ui-sref="projects.crud" )
```
Replace the Hello paragraph in projects.ng.jade with

```
// Notice the two views we declared in the states. Instead of a hello, the two views will appear.
div( ui-view="list", ng-class="crudListClass" )
div( ui-view="form", ng-class="crudFormClass" )
```

Of course, they will only appear if they exist! So let's create them in the views folder. Name them projects.list.ng.jade and projects.list.ng.jade

And type this code in both files.

```
.ibox.float-e-margins.animated.fadeInRight
  .ibox-title
    h5 Hello
  .ibox-content
    p Hello Again
```

Refresh the page and you should see two boxes greeting you.
Good! Now we need to add controllers for them and create some actual features

---

###Adding controllers and features

Create two controllers: projects.form.controller.js and projects.list.controller.js

On list controller we will create a simple array with one project
```
angular.module( 'modules.projects' )
  .controller( 'projects.list', [ '$scope', '$stateParams', 'SweetAlert', 'toastr',
    function( $scope, $stateParams, swal, toastr ) {

      $scope.projects = [];
      var project = {
        name: 'Project',
        price: 100000000,
        dateBegin: new Date(),
        dateEnd: new Date ()
      };
      $scope.projects.push( project );

      // We need this for smart-table
      $scope.rawProjects = [].concat( $scope.projects );

   }]);
```
It's worth noticing the script will be automatically included, so there is no need to add the path in the view.

Edit the jade file to create a table to display the projects

```
.ibox.float-e-margins.animated.fadeInRight( ng-controller="projects.list" ) //Added the controller
  .ibox-title
    h5 Projects
  .ibox-content
    table.table.table-striped( st-table="rawProjects", st-safe-src="projects" )
      thead
        th( st-sort="name" ) Name
        th( st-sort="price" ) Price
        th( st-sort="dateBegin") Begin Date
        th( st-sort="dateEnd") End Date
        th.actions &nbsp;
      tbody
        tr( ng-repeat="project in rawProjects", class="selectable" )
          td {{ project.name }}
          td {{ project.price }}
          td {{ project.dateBegin | date }}
          td {{ project.dateEnd | date }}
```

We should now have a table displaying a project. It would be nice if we could add, edit and delete projects, right?

---

###Adapter and Facade

In this tutorial we will assume you already have some experience with angular, so we can jump straight to the adapter and facade.

Adapter and facade are design patterns. The adapter's function is to allow a certain interface to be used from another. In our case there is the global.adapter.js, which wraps the data storage functions of the app. Each module can create it's own adapter and get an instance of the global one. This way we can add custom behavior to the adapter without editing the source of the global, generic one.

In our case, the facade creates an interface to simplify the interface for server-side validations. With Meteor, we can define functions in the facade and assign them to Meteor.methods.

```
//For example, we create a facade, define methods for saving and removing and assign them to Meteor.methods
Meteor.methods({
  'aClass.save': saveMethod,
  'aClass.remove': removeMethod
});

//Now those two methods can be called with
$meteor.call( 'aClass.save', someParameter );
$meteor.call( 'aClass.remove', someParameter );
```

Note that these are patterns, and may not be the best choices depending on the app that will be developed. The names also have nothing to do with Angular.Js or Javascript. The facades are actually Angular factories, they are just called facades because of the way they were implemented and to make their purpose clearer.

---

###Adding buttons and CRUD

To create CRUD methods for our screen, we need to create the adapter and facade

Let's begin with the adapter.
Create a file in the projects/adapter folder called projects.adapter.js. This file will contain the generic global crud methods and any custom behavior and validations we add.

```
angular.module( 'modules.projects' )
  .factory( 'projects.adapter', [ 'global.adapter', '$meteor', '$q', function( globalAdapter, $meteor, $q ) {

    var adapter = globalAdapter.buildService( Projects );

    // Retrieves a project
    adapter.get = function get( id ) {
      var project = {};

      if ( id ) {
        project = $meteor.object( Projects, id, false ).getRawObject();
      }

      // if it's a new object, send some default fields
      project.name = project.name || '',
      project.price = project.price || 0,
      project.dateBegin = project.dateBegin || new Date(),
      project.dateEnd = project.dateEnd || new Date ()

      return project;
    }

    return adapter;

  }]);
```

Now create a file outside the client folder, in the facades folder. Name it projects.facade.js

```
// Creates a Meteor collection with the name projects
// This is a global variable
Projects = new Meteor.Collection( 'projects' );

// * Save
var projectsSave = function projectsSave( projectAttributes ) {

  // Make sure we get only the expected fields
  // Underscore will create a copy of the object with only the filtered fields
  projectAttributes = _.pick( projectAttributes, '_id', 'name', 'price', 'dateBegin', 'dateEnd' );

  // Validate
  check( projectAttributes.name, String );
  check( projectAttributes.price, Number );
  check( projectAttributes.dateBegin, Date );
  check( projectAttributes.dateEnd, Date )

  // Insert or update and retrieve id
  var projectId = Projects.upsert( projectAttributes._id, projectAttributes );

  // Return id
  return {
    _id: projectId
  }

}

// * Remove
var projectsRemove = function projectsRemove( projectAttributes ) {

  // Make sure we get only the expected fields
  projectAttributes = _.pick( projectAttributes, '_id' );

  // Validate
  check( projectAttributes._id, String );

  // Remove and get result
  var result = Projects.remove( projectAttributes._id );

  // Return result
  return result;

}

// *** Expose methods

Meteor.methods({
  'projects.save': projectsSave,
  'projects.remove': projectsRemove
});
```
Good! Now that we have the adapter and the facade we can go back to the controllers and finish the projects list

---

Open the projects.list.controller and replace everything with this. The code will be explained in the comments.

```
angular.module( 'modules.projects' )
  .controller( 'projects.list', [ '$scope', '$stateParams', '$meteor', 'asynq', 'projects.adapter', 'SweetAlert', 'toastr',
    function( $scope, $stateParams, $meteor, asynq, projectsAdapter, swal, toastr ) {
      // Some dependencies that were not here before:
      // &meteor and asynq will be used to update the list automatically
      // projectsAdapter is the instance of the adapter we created earlier

      // Add state params to scope
      $scope.$params = $stateParams;

      // Now we can control the CRUD functions of the controller with the adapter
      var bindData = function() {
        // Get list of items
        // This will call the find function of the global adapter, since we didn't override it
        $scope.projects = projectsAdapter.find();

        // We need this for smart-table
        $scope.rawProjects = [].concat( $scope.projects );
      }

      // Remove a single item
      $scope.remove = function( project ) {
        // This will also call the global adapter function, but, if we see the function, we can see this line
        // return $meteor.call( collection._name + '.remove', item );
        // So, in the end, this function will call the remove method we declared in the facade
        projectsAdapter.remove( project ).then(function( docs ) {
          toastr.success( 'Removed' );
        }, function( err ) {
          swal.error( 'Oops', err.reason );
        });
      }

      // Subscribe
      // This will enable the list to be updated automatically, but it will need a publication
      $meteor.autorun( $scope, function() {

        asynq.waterfall([
          projectsAdapter.subscribe( 'projects', $scope.getReactively( '$params.type' ) )
        ]).then( bindData.bindApply( bindData ) );

      });

    }]);
```
If you read the code you can see that we need a publication to subscribe to. We can create one in the server/publication folder. Name it projects.publications.js and type the following code.

```
Meteor.publish( 'projects', function() {
  // This will return all documents from our global Projects collection to whomever subscribes
  return Projects.find();
});
```
Now we will edit the list jade file to add buttons to call state transitions and the remove function.

```
.ibox.float-e-margins.animated.fadeInRight( ng-controller="projects.list" )
  .ibox-title
    h5 Projects
    .pull-right
      button.btn.btn-primary.btn-xs( ui-sref="projects.crud.insert" )
        i.fa.fa-plus
  .ibox-content
    table.table.table-striped( st-table="rawProjects", st-safe-src="projects" )
      thead
        th( st-sort="name" ) Name
        th( st-sort="price" ) Price
        th( st-sort="dateBegin" ) Begin Date
        th( st-sort="dateEnd" ) End Date
        th.actions &nbsp;
      tbody
        tr( ng-repeat="project in rawProjects", class="selectable" )
          td {{ project.name }}
          td {{ project.price }}
          td {{ project.dateBegin | date }}
          td {{ project.dateEnd | date }}
          td.actions( ui-sref-active="editing" )
            span.label.label-info Editing
            span.buttons
              button.btn.btn-info.btn-xs( ui-sref="projects.crud.update({ _id: project._id })" )
                i.fa.fa-pencil
              button.btn.btn-danger.btn-xs( ng-click="remove( project )" )
                i.fa.fa-times
```

And now we will change the form controller, which we haven't even changed yet.

```
angular.module( 'modules.projects' )
  .controller( 'projects.form', [ '$scope', '$stateParams', '$state', '$meteor', 'projects.adapter', 'SweetAlert', 'toastr',
    function( $scope, $stateParams, $state, $meteor, projectsAdapter, swal, toastr ) {

      // Add state params to scope
      $scope.$params = $stateParams;

      // Save a single User
      $scope.save = function() {
        // Same thing as the remove function in the list controller, this will call the facade method
        // It will send the loaded project to be saved
        projectsAdapter.save( $scope.project ).then(function() {
          toastr.success( 'Saved' );
          $scope.project = projectsAdapter.get();
          $state.go( 'projects.crud.list' );
        }, function( err ) {
          swal.error( 'Oops', err.reason );
        });
      }

      // Subscribe
      // We do not subscribe in here because the list controller already did it,
      // as both controllers are loaded together

      // Load item reactively
      $meteor.autorun( $scope, function() {
        $scope.project = projectsAdapter.get( $scope.getReactively( '$params._id' ) );
      });

    }]);
```

To finish, we will edit the jade file and create the form.

```
.ibox.float-e-margins.animated.fadeInRight( ng-controller="projects.form" )
  .ibox-title
    h5 Project
    div( ibox-tools )
  .ibox-content
    form
      .form-group
        label Name
        input.form-control( type="text", placeholder="Enter name", ng-model="project.name" )
      .form-group
        label Price
        input.form-control( type="number", placeholder="Enter price", ng-model="project.price" )
      .form-group
        label Begin Date
        input.form-control( type="date", placeholder="Enter begin date", ng-model="project.dateBegin" )
      .form-group
        label End Date
        input.form-control( type="date", placeholder="Enter end date", ng-model="project.dateEnd" )
      button.btn.btn-white( ui-sref="projects.crud.list" ) Cancel
      button.btn.btn-primary( ng-click="save()" ) Save
```
We should have now a fully functional screen where we can add, delete and edit persistent projects.

