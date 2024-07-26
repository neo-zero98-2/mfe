# mfe

In the upcoming lecture, we will be writing our container workflow and using the chrislennon/action-aws-cli@v1.1 action. Unfortunately, this is now failing and appears to be no longer maintained. A community fork was created to fix the issues which we can use instead:

instead of this:

      - uses: chrislennon/action-aws-cli@v1.1

write this:

      - uses: shinyinc/action-aws-cli@v1.2

This updated action will require an AWS_DEFAULT_REGION key, so, for now, we can just add a placeholder.

      - uses: shinyinc/action-aws-cli@v1.2
      - run: aws s3 sync dist s3://${{ secrets.AWS_S3_BUCKET_NAME }}/container/latest
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_DEFAULT_REGION: ""


Also, make sure to verify that you are using the correct branch name in your workflow. GitHub now prompts you to name this main by default.
