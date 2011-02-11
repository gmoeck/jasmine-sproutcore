require "sproutcore/builders/test"

module Jasmine

  module Builder
    class Test < SC::Builder::Test
      def render
        include_jasmine_js
        super
      end

      private

      def include_jasmine_js
        @content_for_final = @content_for_final || ''
        @content_for_final += source_files.map{|file_name| wrap_file(file_name) }.join('')
      end

      def source_files
        ['jasmine', 'jasmine-html', 'jasmine-sproutcore', 'jasmine-runner']
      end

      def wrap_file(file_name)
        return "<script type=\"text/javascript\" src=\"/static/jasmine/en/current/source/#{file_name}.js\"></script>"
      end
    end
  end
end
