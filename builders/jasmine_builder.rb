require "sproutcore/builders/test"

module Jasmine

  module Builder
    class Test < SC::Builder::Test
      def render
        include_jasmine
        super
      end

      private

      def include_jasmine
        include_jasmine_css
        include_jasmine_js
      end

      def include_jasmine_css
        @content_for_page_styles = @content_for_page_styles || ''
        @content_for_page_styles += "<link href=\"/static/jasmine-sproutcore/en/current/stylesheet.css\" rel=\"stylesheet\" type=\"text/css\">"
      end

      def include_jasmine_js
        @content_for_final = @content_for_final || ''
        @content_for_final += js_files.map{|file_name| js_tag(file_name) }.join('')
      end

      def js_files
        ['jasmine', 'jasmine-html', 'jasmine-sproutcore', 'jasmine-matchers', 'jasmine-integration-helpers', 'jasmine-runner']
      end

      def js_tag(file_name)
        return "<script type=\"text/javascript\" src=\"/static/jasmine-sproutcore/en/current/source/#{file_name}.js\"></script>"
      end
    end
  end
end
