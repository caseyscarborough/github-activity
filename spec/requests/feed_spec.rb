# For your testing pleasure, the world's slowest test suite!

require 'spec_helper'

describe 'Feed page' do
  subject { page }

  describe 'user feed' do
    # Visit multiple user pages to ensure that they display.
    # I know, it's not definitive, but it's very useful for letting me know if I broke something.
    # These usernames are pulled from users that I follow on my GitHub account.
    describe 'with username caseyscarborough' do    
      before { visit '/caseyscarborough' }
      it { should have_content('caseyscarborough') }
    end

    describe 'with username matz' do    
      before { visit '/matz' }
      it { should have_content('matz') }
    end

    describe 'with username dhh' do    
      before { visit '/dhh' }
      it { should have_content('dhh') }
    end

    describe 'with username graemerocher' do    
      before { visit '/graemerocher' }
      it { should have_content('graemerocher') }
    end

    describe 'with username mojombo' do    
      before { visit '/mojombo' }
      it { should have_content('mojombo') }
    end

    describe 'with username torvalds' do    
      before { visit '/torvalds' }
      it { should have_content('torvalds') }
    end

    describe 'with username obie' do    
      before { visit '/obie' }
      it { should have_content('obie') }
    end

    describe 'with username ryanb' do    
      before { visit '/ryanb' }
      it { should have_content('ryanb') }
    end

    describe 'with username qrush' do    
      before { visit '/qrush' }
      it { should have_content('qrush') }
    end

    describe 'with username jimweirich' do    
      before { visit '/jimweirich' }
      it { should have_content('jimweirich') }
    end

    describe 'with username schacon' do
      before { visit '/schacon' }
      it { should have_content('schacon') }
    end

    describe 'with username mdo' do
      before { visit '/mdo' }
      it { should have_content('mdo') }
    end

    describe 'with username fat' do
      before { visit '/fat' }
      it { should have_content('fat') }
    end

    describe 'with username charlesread' do
      before { visit '/charlesread' }
      it { should have_content('charlesread') }
    end

    describe 'with username emcmurry' do
      before { visit '/emcmurry' }
      it { should have_content('emcmurry') }
    end

    describe 'with username wayneeseguin' do
      before { visit '/wayneeseguin' }
      it { should have_content('wayneeseguin') }
    end

    describe 'with username jnunemaker' do
      before { visit '/jnunemaker' }
      it { should have_content('jnunemaker') }
    end

    describe 'with username jeffbrown' do
      before { visit '/jeffbrown' }
      it { should have_content('jeffbrown') }
    end

    describe 'with username hakimel' do
      before { visit '/hakimel' }
      it { should have_content('hakimel') }
    end
  end
end