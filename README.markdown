# jasmine-sproutcore
- [http://github.com/gmoeck/jasmine-sproutcore](http://github.com/gmoeck/jasmine-sproutcore)

jasmine-sproutcore provides two tools for integrating [Jasmine](https://jasmine.github.io/) with the [Sproutcore](http://github.com/sproutcore/sproutcore) framework.

- a Sproutcore framework that should be a drop-in replacement of QUnit with Jasmine for testing
- <del>a set of helpers for doing things like click in integration tests</del> - please see [Simulo](https://github.com/gmoeck/simulo) for simulating events in integration tests

#Installation

To setup jasmine-sproutcore to work in your SproutCore project, we need to add the framework to your application.

    $ cd <your sproutcore project's root directory>
    $ mkdir frameworks # if you don't already have a frameworks folder
    $ cd frameworks
    $ git clone git://github.com/gmoeck/jasmine-sproutcore.git
  
Once this has been added to your application, you need to modify your buildfile to use the framework. If you have not previously modified your buildfile, you can just use the sample buildfile from jasmine-sproutcore by doing the following from within your frameworks folder:

    cp jasmine-sproutcore/Buildfile.sample ../Buildfile

If you have previously modified your buildfile, then you need to further modify it to include the following:

    require File.expand_path('../frameworks/jasmine-sproutcore/builders/jasmine_builder', __FILE__)
    ... (Your Previously written setup)
    namespace :build do
      desc "builds a jasmine unit test"
      build_task :test do
        Jasmine::Builder::Test.build ENTRY, DST_PATH
      end
    end

  
You can now write your tests the same way that you normally would using qunit, except in Jasmine. 

##Running Your Tests
You can run your test the same way you would run your QUnit tests, which is through the build server. You can access your tests at:

    http://localhost:4020/YOUR_APP_NAME_HERE/en/current/tests.html

What I usually like to do though is to create a folder for integration tests within my tests folder, and a folder for unit tests. Then I can run them separately with these two urls:

    http://localhost:4020/YOUR_APP_NAME_HERE/en/current/tests/integration.html
    http://localhost:4020/YOUR_APP_NAME_HERE/en/current/tests/unit.html
    

##Thanks To
Lauri Fjällström for the initial poke in the right direction with changing the build
##License:
(The MIT License)

Copyright © 2011 Gregory Moeck

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the ‘Software’), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED ‘AS IS’, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
