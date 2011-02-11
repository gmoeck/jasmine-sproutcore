require File.expand_path('../frameworks/jasmine-sproutcore/builders/jasmine_builder', __FILE__)

config :all, :required => :sproutcore

namespace :build do
  desc "builds a jasmine unit test"
  build_task :test do
    Jasmine::Builder::Test.build ENTRY, DST_PATH
  end
end
