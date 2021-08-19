LOCAL_LAMBDA_TIMEOUT=300
LOCAL_LAMBDA_MEMORY=256

BUILD_DIR = build

.PHONY: build invoke

build:
	@sam build --use-container --cached --build-dir $(BUILD_DIR)

invoke:
	@sam local invoke --no-event --parameter-overrides='ParameterKey=LambdaTimeout,ParameterValue=${LOCAL_LAMBDA_TIMEOUT} ParameterKey=LambdaMemory,ParameterValue=${LOCAL_LAMBDA_MEMORY}'
