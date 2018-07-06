import re
from fileinput import FileInput

from datetime import datetime as _datetime

from fabric.api import cd, env, local, run
from fabric.colors import blue


env.config_path = 'src/environments/'


def development():
    """fab development [command]"""
    env.name = 'development'
    env.environment = env.name
    # env.hosts = ['localhost']
    env.path = './'
    env.branch = 'development'
    env.push_branch = env.branch
    env.push_remote = 'origin'
    env.after_deploy_url = 'http://localhost:8100/'


# def staging():
#     """fab staging [command]"""
#     env.name = 'staging'
#     env.environment = env.name
#     env.hosts = ['colegend.org']
#     env.path = 'stagingapp.colegend.org/project'
#     env.branch = 'staging'
#     env.push_branch = env.branch
#     env.push_remote = 'origin'
#     env.after_deploy_url = 'https://staging.colegend.org'


def production():
    """fab production [command]"""
    env.name = 'production'
    env.environment = env.name
    env.hosts = ['colegend.org']
    env.path = '~/colegend/colegend'
    env.backup_path = '~/colegend/backups'
    env.branch = 'master'
    env.push_branch = env.branch
    env.push_remote = 'origin'
    env.after_deploy_url = 'https://app.colegend.org'


def update_version():
    """Incrementing the version string."""

    # Updating package.json version
    pattern = re.compile(r'"version": "(?P<major>\d+)\.(?P<minor>\d+).(?P<patch>\d+)",')
    template = '"version": "{major}.{minor}.{patch}",'
    for line in FileInput('./package.json', inplace=True):
        match = re.search(pattern, line)
        if match:
            major, minor, patch = match.groups()
            print(line.replace(match.group(0), template.format(major=major, minor=minor, patch=int(patch)+1)).rstrip('\n'))
        else:
            print(line.rstrip('\n'))

    # Updating config.xml version
    pattern = re.compile(r'version="(?P<major>\d+)\.(?P<minor>\d+).(?P<patch>\d+)"')
    template = 'version="{major}.{minor}.{patch}"'
    for line in FileInput('./config.xml', inplace=True):
        match = re.search(pattern, line)
        if match:
            major, minor, patch = match.groups()
            print(line.replace(match.group(0), template.format(major=major, minor=minor, patch=int(patch)+1)).rstrip('\n'))
        else:
            print(line.rstrip('\n'))


def deploy():
    print(blue('> deploying'))

    if env.name in ['production']:
        update_version()

    build()
    upload()


def set_environment():
    local(f'cp {env.config_path}environment.{env.name}.ts {env.config_path}environment.ts')


def build():
    print(blue('> building'))

    # Setting environment config file.
    local(f'mv {env.config_path}environment.ts {env.config_path}environment.ts.temp')
    set_environment()

    # local('ionic cordova build android --prod --release', cwd='..', shell=True)
    local('ionic cordova build android --release')
    local('ionic cordova build ios --release')

    # Resetting environment config
    local(f'mv {env.config_path}environment.ts.temp {env.config_path}environment.ts')

    # with cd('scripts'):
    #   local('keytool -genkey -v -keystore alpha.jks -keyalg RSA -keysize 2048 -validity 10000 -alias alpha')

    local('cp platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk scripts/')

    local('jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore scripts/alpha.keystore -storepass coalpha scripts/app-release-unsigned.apk alpha')

    local('rm scripts/coapp-alpha.apk')
    local('~/Library/Android/sdk/build-tools/26.0.0/zipalign -v 4 scripts/app-release-unsigned.apk scripts/coapp-alpha.apk')


def upload():
    print(blue('> uploading'))

    if env.name in ['staging', 'production']:
      # local(f'firebase use {env.name}')
      # local('ionic upload --note "wip" --deploy {env.name}')
      # local('firebase deploy')
      if env.name == 'production':
        local(f'rsync -azP --delete --exclude .htaccess www/ {env.hosts[0]}:html/coapp')
      elif environment == 'staging':
        print('Staging is not yet configured for deployment.')


# def enable_debug():
#     """TODO Enable debug mode: fab [environment] enable_debug"""
#     print('Not yet implemented')
#
#
# def disable_debug():
#     """TODO: Disable debug mode: fab [environment] disable_debug"""
#     print('Not yet implemented')
#
#
# def push():
#     """Push local code to the repository: fab [environment] push"""
#     local('git push origin {push_branch}'.format(**env))
#
#
# def update():
#     """TODO: Update the server repository: fab [environment] update"""
#     print('Not yet implemented')


def ps():
    """Show the running server processes: fab [environment] ps"""
    run('htop')
