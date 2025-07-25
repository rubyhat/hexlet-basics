namespace :app do
  desc "Load exercies"
  task :load_exercises, [ :lang ] => :environment do |_task, args|
    language_version = LanguageVersionManager.new.find_or_create_language_with_version(args.lang)

    ExerciseLoader.new.run(language_version)
  end

  desc "Remove exercies"
  task remove_exercises: :environment do
    docker_exercise_client = DepsLocator.current.docker_exercise_client

    languages = Language.all

    languages.each do |language|
      # TODO После перехода на Rails 7 заменить на excluding
      latest_versions = language.versions
                                .reverse_order
                                .where.not(id: language.current_version&.id)
                                .take(10)

      latest_versions.each do |version|
        docker_exercise_client.remove_image(language.slug, version.image_tag)
      end
    end
  end
end
